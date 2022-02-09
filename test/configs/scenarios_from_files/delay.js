const URL = 'https://garris.github.io/BackstopJS';

module.exports = {
  selectors: ['.getItBlock:nth-child(3)'],
  scenarios: [{
    label: 'delay',
    url: `${URL}/index.html?delay`,
    delay: 5000
  },
  {
    label: 'noDelay',
    url: `${URL}/index.html?delay`
  }]
};
