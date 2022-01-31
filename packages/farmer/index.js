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
      name: "DEPENDENCY",
      type: "input",
      message: "What is the name of the dependency you want to update?",
    },
    {
      name: "VERSION",
      type: "input",
      message: "What version do you want it to be?",
    },
    {
      name: "DIRECTORY",
      type: "input",
      message:
        "What is the path to the directory of repos your want to update? We'll confirm which repos exactly later.",
      default: ".",
    },
    {
      name: "BRANCH",
      type: "input",
      message: "What branch do you want to make these changes against?",
      default: "main",
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
  let branch;
  const args = minimist(process.argv.slice(2));
  const unflaggedArgs = args["_"];
  if (!(args.p && args.d && args.v)) {
    console.log(
      chalk.yellow(
        `Whoops, correct format is: -d <dependency> -v <version>.\nYou can also specifiy: -p <path/to/directory> -b <branch> -t (tag or not).\n\nThat's all right! Answer the following por favor:\n`
      )
    );
    const answers = await askQuestions();
    const { DIRECTORY, DEPENDENCY, VERSION, TAG, BRANCH = "main" } = answers;
    pathToDir = DIRECTORY;
    dependency = DEPENDENCY;
    upgradeVersion = VERSION;
    branch = BRANCH;
    toTag = TAG;
  } else {
    pathToDir = args.p;
    dependency = args.d;
    upgradeVersion = args.v;
    toTag = !!args.t;
    branch = args.b ?? "main";
  }

  fs.readdir(pathToDir, { withFileTypes: true }, async (err, files) => {
    let repos = [];
    for await (const dirent of files) {
      if (!dirent.isDirectory()) {
        continue;
      }
      const repoPath = path.join(__dirname, pathToDir, dirent.name);
      const git = require("simple-git")(repoPath);
      const isRepo = await git.checkIsRepo("root");
      if (isRepo) {
        repos.push(dirent.name);
      }
    }

    if (repos && repos.length) {
      const { reposToUpdate } = await askToIncludeRepos(repos);
      console.log(`🙌  Updating some repos for you:`, reposToUpdate);
      await Promise.mapSeries(reposToUpdate, async (repo) => {
        console.log(chalk.bold.cyan(`\nWorking on ${repo}. Wish me luck`));
        const repoPath = path.join(__dirname, pathToDir, repo);
        const git = require("simple-git")(repoPath);

        //Checkout develop
        await checkoutBranch(git, branch);

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
          return await commitAndTagRepo({ branch, repo, git, dependency, upgradeVersion });
        } else {
          return await commitRepo({ branch, repo, git, dependency, upgradeVersion });
        }
      })
        .then(() => console.log(chalk.green("\nAll done! 😄 🔥 😄 🔥")))
        .catch((err) => console.log(err.stack));
    } else {
      console.log(chalk.cyan(`I didn't find any repos. Are you sure that "${pathToDir}" is right?`));
    }
  });
};

async function commitRepo({ branch, git, dependency, upgradeVersion }) {
  return await git
    .add("./*")
    .then(() => {
      console.log("Committing updates...🤞");
      return git.commit(`chore: ${dependency} to ${upgradeVersion}`);
    })
    .then(() => {
      console.log("Pushing commit 🙏");
      return git.push("origin", branch);
    })
    .catch((err) => console.log(err));
}

async function commitAndTagRepo({ branch, repo, git, dependency, upgradeVersion }) {
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
    .add(".")
    .then(() => {
      console.log("Committing updates...🤞");
      return git.commit(`chore: update ${dependency} to version ${upgradeVersion}`);
    })
    .then(() => git.pull("origin", branch, "--tags"))
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
      return git.push("origin", branch);
    })
    .then(() => git.pushTags())
    .catch((err) => console.log(err));
}

async function checkoutBranch(git, branch) {
  console.log(branch);
  const branchSummary = await git.branch();
  if (branchSummary.current === branch) {
    return;
  }
  try {
    await git.checkout(branch);
    await git.pull();
  } catch (e) {
    await git.checkoutLocalBranch(branch);
  }

  return;
}

run();
