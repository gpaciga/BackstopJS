const URL = 'https://garris.github.io/BackstopJS';

module.exports = {
  selectors: ['.moneyshot'],
  scenarios: [{
    label: 'readyEvent',
    url: `${URL}/index.html?delay`,
    readyEvent: '_the_lemur_is_ready_to_see_you'
  },
  {
    label: 'readyEventTimeout',
    url: `${URL}/index.html?delay`,
    readyEvent: '_the_lemur_is_ready_to_see_you_timeout',
    readyTimeout: 2000
  },
  {
    label: 'readySelector',
    url: `${URL}/index.html?delay`,
    readySelector: '._the_lemur_is_ready_to_see_you'
  },
  {
    label: 'readySelectorTimeout',
    url: `${URL}/index.html?delay`,
    readySelector: '._the_lemur_is_ready_to_see_you_timeout',
    readyTimeout: 2000
  }]
};
