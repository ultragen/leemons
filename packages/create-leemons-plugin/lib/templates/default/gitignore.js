const path = require('path');
const createFile = require('../../helpers/utils/createFile');

module.exports = (config) => {
  const routes = config.routes.values;

  const gitignore = `\
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# leemons integrity
checksums.json

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env.local
.env.development.local
.env.test.local
.env.production.local

# vercel
.vercel
`;
  const dir = path.join(routes.app, '.gitignore');

  return createFile(dir, gitignore, '.gitignore');
};