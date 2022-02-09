const URL = 'https://garris.github.io/BackstopJS';

module.exports = {
  scenarios: [{
    label: 'cookies',
    cookiePath: 'backstop_data/cookies.json',
    url: `${URL}/index.html?cookie`,
    selectors: ['.moneyshot']
  },
  {
    label: 'hover',
    url: `${URL}/index.html?click`,
    hoverSelector: '#theLemur',
    postInteractionWait: 1000,
    selectors: ['.moneyshot']
  },
  {
    label: 'click',
    url: `${URL}/index.html?click`,
    clickSelector: '#theLemur',
    postInteractionWait: '._the_lemur_is_ready_to_see_you',
    selectors: ['.moneyshot']
  },
  {
    label: 'scrollToSelector',
    url: `${URL}/test/configs/special_cases/scrollToSelector.html`,
    scrollToSelector: '.lemurFace',
    selectors: ['.lemurFace']
  }]
};
