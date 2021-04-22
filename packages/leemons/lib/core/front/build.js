const ora = require('ora');
const execa = require('execa');
const fs = require('fs-extra');
const path = require('path');
const hooks = require('leemons-hooks');

/*
 * Global Next.js Dependencies Installation
 */
async function frontDeps() {
  // Check if the dependencies are installed
  if (!fs.existsSync(path.resolve(leemons.dir.next, 'node_modules'))) {
    leemons.frontNeedsUpdateDeps = true;
  }

  // Install dependencies when needed
  if (leemons.frontNeedsUpdateDeps) {
    await hooks.fireEvent('leemons::installDeps', { status: 'start' });
    const installSpinner = ora('Installing frontend dependencies').start();
    return execa
      .command(`yarn --cwd ${leemons.dir.next} --force`)
      .then(() => {
        installSpinner.succeed('Frontend dependencies installed');
      })
      .catch((e) => {
        installSpinner.fail("Frontend dependencies can't be installed");
        fs.removeSync(path.resolve(leemons.dir.next, 'node_modules'));
        throw e;
      })
      .finally(async () => {
        await hooks.fireEvent('leemons::installDeps', { status: 'end' });
      });
  }
  return null;
}

/*
 * Next.js Build
 */
async function buildNext() {
  // Check if the build exists
  if (!fs.existsSync(path.resolve(leemons.dir.next, '.next'))) {
    leemons.frontNeedsBuild = true;
    // The error can be related to dependencies
    leemons.frontNeedsUpdateDeps = true;
  }

  // Build if necessary
  if (leemons.frontNeedsBuild) {
    await hooks.fireEvent('leemons::build', { status: 'start' });
    const spinner = ora('Building frontend').start();
    return execa
      .command(`yarn --cwd ${leemons.dir.next} build`)
      .then(() => {
        spinner.succeed('Frontend builded');
      })
      .catch((e) => {
        spinner.fail(`Frontend can't be builded`);
        fs.removeSync(path.resolve(leemons.dir.next, '.next'));
        throw e;
      })
      .finally(async () => {
        await hooks.fireEvent('leemons::build', { status: 'end' });
      });
  }
  return null;
}

async function build() {
  await frontDeps();
  await buildNext();
}

module.exports = build;