# xcodefeed

> What's happening w/ Xcode

A lazy wrapper around the https://xcodereleases.com/data.json API.

## USAGE

```sh
# Fetch latest 10 releases:
npx pdehaan/xcodefeed

# Fetch latest 2 releases:
COUNT=2 npx pdehaan/xcodefeed

# Fetch latest 5 "beta" channel releases:
CHANNELS=beta COUNT=5 npx pdehaan/xcodefeed

# Fetch latest 2 "gm" or "gmSeed" channel releases:
CHANNELS=gm,gmSeed COUNT=2 npx pdehaan/xcodefeed
```
