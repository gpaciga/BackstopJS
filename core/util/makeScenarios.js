const path = require('path');
const glob = require('glob');

const logger = require('./logger')('makeScenarios');

const getFiles = (pattern) => {
  if (pattern.indexOf('./') !== 0 && pattern.indexOf('/') !== 0) {
    pattern = './' + pattern;
  }
  return glob.sync(pattern);
};

// Read through each file and extract the scenario objects
const gatherScenariosFromFiles = (files) => {
  return files.reduce((scenarios, filename) => {
    const thisPath = path.join(process.cwd(), filename);

    logger.log('Loading scenarios from: ' + thisPath);

    const thisConfig = require(thisPath);
    const theseScenarios = getScenarios(thisConfig);
    theseScenarios.forEach(scenario => {
      // Includes file in label for disambiguation
      // probably want to split path based on OS and recompose with /
      // so the report can rely on / being the separator
      const labelPrefix = filename.replace(/^\.\//, '').replace(/^\//, '');
      scenario.label = labelPrefix + '/' + scenario.label;
    });

    scenarios.push(...theseScenarios);
    return scenarios;
  }, []);
};

// In a scenarios file, maps the top-level properties onto each of the
// scenarios defined, as if they were explicitly stated in all of them
const getScenarios = metaObject => {
  const scenarios = metaObject.scenarios;
  const meta = {};
  for (const property in metaObject) {
    if (
      Object.prototype.hasOwnProperty.call(metaObject, property) &&
        property !== 'scenarios'
    ) {
      meta[property] = metaObject[property];
    }
  }
  return scenarios.map(scenario => {
    return Object.assign({}, meta, scenario);
  });
};

const loadScenariosFromFiles = (filePattern) => {
  const files = getFiles(filePattern);
  return gatherScenariosFromFiles(files);
};

function makeScenarios (config) {
  if (typeof config.scenarios === 'string') {
    config.scenarios = loadScenariosFromFiles(config.scenarios);
  }
  return config.scenarios || [];
}

module.exports = makeScenarios;
