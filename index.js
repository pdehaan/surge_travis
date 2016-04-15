const writeFile = require("fs").writeFileSync;
const join = require("path").join;

const contents = `<!doctype html>
<html>
<head>
  <title>${process.env.TRAVIS_REPO_SLUG}</title>
</head>
<body>
<h1>${process.env.TRAVIS_REPO_SLUG}</h1>
<strong>TRAVIS_NODE_VERSION: ${process.env.TRAVIS_NODE_VERSION}</strong>
<ul>
<li>TRAVIS_BRANCH: ${process.env.TRAVIS_BRANCH}</li>
<li>TRAVIS_BUILD_ID: ${process.env.TRAVIS_BUILD_ID}</li>
<li>TRAVIS_BUILD_NUMBER: ${process.env.TRAVIS_BUILD_NUMBER}</li>
<li>TRAVIS_COMMIT: ${process.env.TRAVIS_COMMIT}</li>
<li>TRAVIS_PULL_REQUEST: ${process.env.TRAVIS_PULL_REQUEST}</li>
<li>TRAVIS_TAG: ${process.env.TRAVIS_TAG}</li>
</ul>
</body>
</html>`;

writeFile(join('dist', 'index.html'), contents, 'utf-8');
