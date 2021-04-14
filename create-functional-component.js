const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const chalk = require('chalk');

const argv = yargs(hideBin(process.argv)).argv;

const error = chalk.bold.red;
const warning = chalk.keyword('orange');

const compDirPath = path.resolve(__dirname, 'src', 'components');

(() => {
  const { dir, comp } = argv;

  if (!dir) {
   return console.log(warning('Please provide components subdirectory name inside src/components directory. We will create the one if not exists for you'));
  }

  if (!comp) {
    return console.log(warning('Please provide component name.'));
  }

  const compSubDirPath = path.resolve(compDirPath, dir);

  if (!fs.existsSync(compSubDirPath)) {
    fs.mkdirSync(compSubDirPath);
  }

  const filename = comp + '.js';
  const componentPath = path.resolve(compSubDirPath, filename);

  if (fs.existsSync(componentPath)) {
    return console.log(error('Component with such name already exists!'));
  }

  const fileTemplate = `const ${comp} = () => {
  return (
    <div>${comp}</div>
  );
}

export default ${comp};
  `

  fs.writeFileSync(componentPath, fileTemplate);

})();
