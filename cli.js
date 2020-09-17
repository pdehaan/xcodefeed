#!/usr/bin/env node

const lib = require("./lib");

main();

async function main(count = process.env.COUNT, channels = process.env.CHANNELS) {
  const releases = await lib.getReleases(count, channels);
  for (const release of releases) {
    console.log(release.toString());
  }
}
