#!/usr/bin/env node

const lib = require("./lib");

main();

async function main(count = process.env.COUNT) {
  const releases = await lib.getReleases(count);
  for (const release of releases) {
    console.log(release.toString());
  }
}
