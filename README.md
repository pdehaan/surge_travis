# Deploy to surge.sh on Travis-CI commits

[![Build Status](https://travis-ci.org/pdehaan/surge_travis.svg?branch=master)](https://travis-ci.org/pdehaan/surge_travis)

Basically this: [Integrating with Travis CI](https://surge.sh/help/integrating-with-travis-ci)

## TL;DR:

This repo is a simple test of pushing a new site to surge.sh from Travis-CI hooks for various commits.

The following [.travis.yml](/.travis.yml) snippet shows the `script` and `after_script` sections:

```yaml
script:
  - npm run build

after_script:
  - npm run deploy
```

On each commit, Travis-CI will run `npm run build` (from the package.json's `scripts` section). If that command is successful, the `after_script` tasks will get called.

Here's a quick look at the relevant [package.json](/package.json) bits:
```js
  "scripts": {
    "build": "node index",
    "deploy": "scripty"
  }
```

You can see here that `npm run build` script will call `$ node index` which generates the dist/index.html file that we'll be deploying to surge.sh.
The `npm run deploy` script uses the [**scripty**](http://npm.im/scripty) module to call the [/scripts/deploy](/scripts/deploy) shell script.

```sh
#!/usr/bin/env sh

echo "Hello from scripty"
echo $TRAVIS_PULL_REQUEST

if [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  surge --project ./dist --domain auto-deploy-test.surge.sh
else
  echo "This is a PR, not deploying"
fi
```

Here we have a couple pointless `echo` statements, and a clever `if` statement which determines if we're looking at a pull request or merging into master. If the current build is a pull request (`$TRAVIS_PULL_REQUEST` will be a number), we want to ignore it and not deploy to surge.sh since we don't want a new build deployed until a PR lands in the master branch. If the current build is NOT a pull request (`$TRAVIS_PULL_REQUEST` will be "false"), we use the surge.sh CLI to deploy the ./dist directory to our custom domain.
