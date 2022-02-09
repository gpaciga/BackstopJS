const URL = 'https://garris.github.io/BackstopJS';

module.exports = {
  scenarios: [{
    label: 'scenarioSpecificViewports',
    url: `${URL}/index.html`,
    selectors: ['document', 'viewport'],
    viewports: [
      {
        label: 'Galaxy-S5',
        width: 360,
        height: 640
      }
    ]
  },
  {
    label: 'scenarioSpecificViewports-withEmptyViewports',
    url: `${URL}/index.html`,
    viewports: []
  },
  {
    label: 'scenarioSpecificViewports-withMultipleViewports',
    url: `${URL}/index.html`,
    viewports: [
      {
        label: 'Pixel-2',
        width: 411,
        height: 731
      },
      {
        label: 'Pixel2-XL',
        width: 411,
        height: 823
      },
      {
        label: 'iPhone-X',
        width: 375,
        height: 812
      },
      {
        label: 'iPad-Pro',
        width: 1024,
        height: 1366
      }
    ]
  },
  {
    label: 'scenarioSpecificViewports-withExpandSelector',
    url: `${URL}/index.html`,
    selectors: ['.getItBlock'],
    selectorExpansion: true,
    viewports: [
      {
        label: 'iPad-Pro',
        width: 1024,
        height: 1366
      }
    ]
  }]
};
