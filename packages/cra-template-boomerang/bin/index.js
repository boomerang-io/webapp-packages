#!/usr/bin/env node
"use strict";
const spawn = require("cross-spawn");

const yargs = require("yargs");

yargs
  .usage("Usage: $0 <command>")
  .command("upgradeProject", "upgrade project dependencies and configuration to match template", () => {
    executeNodeScript(["./upgradeProject.js", process.cwd()]);
  }).argv;

function executeNodeScript(args) {
  const child = spawn.sync("node", args, {
    cwd: __dirname,
    stdio: "inherit",
  });
}
