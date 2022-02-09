const URL = 'https://garris.github.io/BackstopJS';

module.exports = {
  scenarios: [{
    label: 'expanded',
    url: `${URL}/index.html`,
    selectors: ['.getItBlock'],
    selectorExpansion: true,
    delay: 1000
  },
  {
    label: 'notExpanded',
    url: `${URL}/index.html`,
    selectors: ['.getItBlock'],
    delay: 1000
  },
  {
    label: 'expect',
    url: `${URL}/index.html`,
    selectors: ['.getItBlock'],
    selectorExpansion: true,
    expect: 4
  },
  {
    label: 'magicSelectors',
    url: `${URL}/index.html`,
    selectors: ['document', 'viewport']
  },
  {
    label: 'hideSelectors',
    url: `${URL}/index.html`,
    hideSelectors: ['.logo-link', 'p']
  },
  {
    label: 'removeSelectors',
    url: `${URL}/index.html`,
    removeSelectors: ['.logo-link', 'p']
  },
  {
    label: 'notFound',
    url: `${URL}/index.html`,
    selectors: ['.monkey']
  },
  {
    label: 'notVisible',
    url: `${URL}/index.html`,
    selectors: ['#noShow']
  },
  {
    label: 'keyPressSelector',
    url: `${URL}/examples/featureTests/index.html`,
    keyPressSelectors: [
      {
        selector: 'input[placeholder="Email"]',
        keyPress: 'marcdacz@backstopjs.com'
      },
      {
        selector: 'input[placeholder="Password"]',
        keyPress: '1234'
      }
    ],
    selectors: ['div[id=navbar]'],
    postInteractionWait: 1000,
    misMatchThreshold: 5,
    viewports: [
      {
        label: 'Desktop',
        width: 800,
        height: 300
      }
    ]
  }
  ]
};
