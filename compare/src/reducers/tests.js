const tests = (state = {}, action) => {
  switch (action.type) {
    case 'FILTER_TESTS':
      if (action.status !== 'all') {
        return Object.assign({}, state, {
          filtered: state.all.filter(e => e.status === action.status),
          filterStatus: action.status
        });
      } else {
        return Object.assign({}, state, {
          filtered: state.all,
          filterStatus: action.status
        });
      }

    // @TODO: to optimize
    case 'SEARCH_TESTS':
      if (action.value.length > 0) {
        return Object.assign({}, state, {
          filtered: state.all.filter(e => {
            let fileName = e.pair.fileName.toLowerCase();
            let label = e.pair.label.toLowerCase();

            if (state.filterStatus !== 'all') {
              if (
                e.status === state.filterStatus &&
                (label.indexOf(action.value.toLowerCase()) !== -1 ||
                  fileName.indexOf(action.value.toLowerCase()) !== -1)
              ) {
                return true;
              }
            } else {
              if (
                label.indexOf(action.value.toLowerCase()) !== -1 ||
                fileName.indexOf(action.value.toLowerCase()) !== -1
              ) {
                return true;
              }
            }
          })
        });
      }
      return state;

    case 'NAVIGATE_TESTS':
      let filtered = state.all;

      if (state.filterStatus !== 'all') {
        filtered = filtered.filter(e => e.status === state.filterStatus);
      }

      if (action.mode === 'label') {
        filtered = filtered.filter(e => e.pair.label.indexOf(action.path) === 0);
      } else if (action.mode === 'viewport') {
        filtered = filtered.filter(e => e.pair.viewportLabel.indexOf(action.path) === 0);
      }

      return Object.assign({}, state, {
        filtered: filtered
      });

    default:
      return state;
  }
};

export default tests;
