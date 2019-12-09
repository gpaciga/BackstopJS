// requires react-simple-tree-menu

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { navigateTests } from '../../actions';
import NavigationCard from '../organisms/NavigationCard';

const NavWrapper = styled.nav`
  width: 100%;
  padding: 10px 30px;
  box-sizing: border-box;
`;

class Navigation extends React.Component {
  labelFilter (tests, label) {
    return tests.filter(
      test => test.pair.label.indexOf(label) === 0
    );
  }

  viewportFilter (tests, viewport) {
    return tests.filter(
      test => test.pair.viewportLabel.indexOf(viewport) === 0
    );
  }

  labelTree (tests) {
    const labels = tests.map(test => test.pair.label);
    return this.buildTree(labels);
  }

  viewportTree (tests) {
    const viewports = tests.map(test => test.pair.viewportLabel);
    return this.buildTree(viewports);
  }

  buildTree (paths) {
    let treeData = paths.reduce((tree, path) => {
      const parts = path.split('/');
      // console.log(parts);

      let currentNode = tree;
      parts.forEach((part, index) => {
        const leadingParts = parts.slice(0, index + 1);
        const leadingPath = leadingParts.join('/');
        const stats = this.statsForPath(leadingPath);
        if (!currentNode.hasOwnProperty(part)) {
          currentNode[part] = {
            label: part,
            parts: leadingParts,
            path: leadingPath,
            stats: stats,
            nodes: {}
          };
        }
        currentNode = currentNode[part].nodes;
      });
      // console.log(tree);
      return tree;
    }, {});

    // enclose in a root node so we can always reset
    treeData = {
      'All Tests': {
        label: 'All Tests',
        parts: [],
        path: '',
        stats: this.statsForPath(''),
        nodes: treeData
      }
    };

    return treeData;
  }

  statsForPath (path) {
    let total;
    if (this.props.mode === 'label') {
      total = this.labelFilter(this.props.all, path);
    } else if (this.props.mode === 'viewport') {
      total = this.viewportFilter(this.props.all, path);
    }

    const pass = total.filter(
      t => t.status === 'pass'
    );

    const fail = total.filter(
      t => t.status === 'fail'
    );

    return {
      total: total.length,
      pass: pass.length,
      fail: fail.length
    };
  }

  render () {
    if (this.props.mode === 'label' && !this.props.settings.labelNav) {
      return null;
    }

    if (this.props.mode === 'viewport' && !this.props.settings.viewportNav) {
      return null;
    }

    let treeData;
    if (this.props.mode === 'label') {
      treeData = this.labelTree(this.props.tests);
    } else if (this.props.mode === 'viewport') {
      treeData = this.viewportTree(this.props.tests);
    }
    // console.log("treeData=", treeData);

    const buttonFor = (node, depth) => {
      return <NavigationCard
        key={node.path}
        node={node}
        mode={this.props.mode}
        navigateTo={this.props.navigateTo}
        depth={depth}
      />;
    };

    let depth = 0;

    let breadcrumbs = [];
    // dive into the tree to get the first split
    let currentNode = treeData;
    while (Object.keys(currentNode).length === 1) {
      const key = Object.keys(currentNode)[0];
      const node = currentNode[key];
      breadcrumbs.push(buttonFor(node, depth));
      currentNode = node.nodes;
      depth++;
    }

    const subNodes = [];
    for (const key in currentNode) {
      const node = currentNode[key];
      // console.log("parsing", node);
      subNodes.push(buttonFor(node, depth));
    }

    return (
      <NavWrapper>
        {breadcrumbs}
        {subNodes}
      </NavWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    tests: state.tests.filtered,
    all: state.tests.all,
    settings: state.layoutSettings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: (mode, path) => {
      console.log('navigating to', mode, path);
      dispatch(navigateTests(mode, path));
    }
  };
};

const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default NavigationContainer;
