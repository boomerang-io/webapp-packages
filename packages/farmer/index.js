#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const spawn = require("cross-spawn");
const chalk = require("chalk");
const inquirer = require("inquirer");
const Promise = require("bluebird");
const minimist = require("minimist");

const askQuestions = async () => {
  const questions = [
    {
      name: "DIRECTORY",
      type: "input",
      message: "What is the relative path to the directory of repos your want to update?",
    },
    {
      name: "DEPENDENCY",
      type: "input",
      message: "What dependency do you want to update?",
    },
    {
      name: "VERSION",
      type: "input",
      message: "What version do you want it to be?",
    },
    {
      name: "TAG",
      type: "confirm",
      message: "Do you want to tag the changes?",
    },
  ];
  return inquirer.prompt(questions);
};

async function askToIncludeRepos(choices) {
  const questions = [
    {
      name: "reposToUpdate",
      type: "checkbox",
      message: "Check the repos you want to update",
      choices,
    },
  ];
  return inquirer.prompt(questions);
}

const run = async () => {
  console.log(
    chalk.bold.magenta(
      "🏁 Hi! Here to make your life easier :)\nI'll update all of the repos in a directory to the latest version of a dependency for you 🦊\n"
    )
  );

  let pathToDir;
  let dependency;
  let upgradeVersion;
  let toTag;
  const args = minimist(process.argv.slice(2));
  if (Object.keys(args).length < 3) {
    console.log(
      chalk.yellow(
        `Whoops, correct format is: <path/to/directory> <dependency> <version>.\nThat's all right! Answer the following por favor:\n`
      )
    );
    const answers = await askQuestions();
    const { DIRECTORY, DEPENDENCY, VERSION, TAG } = answers;
    pathToDir = DIRECTORY;
    dependency = DEPENDENCY;
    upgradeVersion = VERSION;
    toTag = TAG;
  } else {
    pathToDir = args.p;
    dependency = args.d;
    upgradeVersion = args.v;
    toTag = !!args.t;
  }

  fs.readdir(pathToDir, async (err, repos) => {
    if (repos && repos.length) {
      const { reposToUpdate } = await askToIncludeRepos(repos);
      console.log(`🙌  Updating some repos for you:`, reposToUpdate);
      await Promise.mapSeries(reposToUpdate, async (repo) => {
        console.log(chalk.bold.cyan(`\nWorking on ${repo}. Wish me luck`));
        const repoPath = path.join(__dirname, pathToDir, repo);
        const git = require("simple-git/promise")(repoPath);

        //Checkout develop
        await checkoutDevelop(git);

        const packagePath = path.join(repoPath, "package.json");
        const packageJSON = require(packagePath);
        const currentVersion = packageJSON.dependencies[dependency];

        // Get current dependency version
        if (!currentVersion) {
          console.log(chalk.yellow("Dependency doesn't exist! Onwards..."));
          return;
        }
        if (currentVersion === upgradeVersion) {
          console.log(chalk.yellow("Already at specified version! Onwards..."));
          return;
        }

        packageJSON.dependencies[dependency] = upgradeVersion;
        fs.writeFileSync(packagePath, JSON.stringify(packageJSON));

        // Update npm lock file
        console.log("⚙️ Installing updates. This could take a while...🤷");
        const proc = spawn.sync("npm", ["--prefix", repoPath, "install"], { stdio: "inherit" });
        if (proc.status !== 0) {
          console.error(`\`${command} ${args.join(" ")}\` failed`);
          return;
        }
        // Commit, tag and push
        if (toTag) {
          return await commitAndTagRepo({ repo, git, dependency, upgradeVersion });
        } else {
          return await commitRepo({ repo, git, dependency, upgradeVersion });
        }
      })
        .then(() => console.log(chalk.green("\nAll done! 😄 🔥 😄 🔥")))
        .catch((err) => console.log(err.stack));
    } else {
      console.log(chalk.cyan(`I didn't find any repos. Are you sure that "${pathToDir}" is right?`));
    }
  });
};

async function commitRepo({ repo, git, dependency, upgradeVersion }) {
  return await git
    .add("./*")
    .then(() => {
      console.log("Committing updates...🤞");
      return git.commit(`chore: ${dependency} to ${upgradeVersion}`);
    })
    .then(() => {
      console.log("Pushing commit 🙏");
      return git.push();
    })
    .catch((err) => console.log(err));
}

async function commitAndTagRepo({ repo, git, dependency, upgradeVersion }) {
  // let isRepo;
  // try {
  //   isRepo = await git.checkIsRepo();
  //   if (!isRepo) {
  //     console.log(chalk.red(`${repo} is not a git repository`));
  //     return;
  //   }
  // } catch (e) {
  //   console.log("Something went wrong");
  //   return;
  // }

  return await git
    .add("./*")
    .then(() => {
      console.log("Committing updates...🤞");
      return git.commit(`chore: update ${dependency} to version ${upgradeVersion}`);
    })
    .then(() => git.tags())
    .then((tags) => {
      if (tags && tags.latest) {
        const { latest } = tags;
        const lastPeriodIndex = latest.lastIndexOf(".");
        const newPatchDigit = parseInt(latest.slice(lastPeriodIndex + 1)) + 1;
        const newTag = `${latest.slice(0, lastPeriodIndex)}.${newPatchDigit}`;

        console.log(`🏷️ Adding tag ${newTag} to ${repo}`);
        return git.addTag(newTag);
      }
    })
    .then(() => {
      console.log("Pushing commit and tag 🙏");
      return git.push();
    })
    .then(() => git.pushTags())
    .catch((err) => console.log(err));
}

async function checkoutDevelop(git) {
  return await git
    .branch()
    .then((branchSummary) => {
      return branchSummary.current !== "develop" && git.checkout("develop");
    })
    .then(() => git.pull())
    .then(() => git.pull("origin", "develop", "--tags"));
}

run();
