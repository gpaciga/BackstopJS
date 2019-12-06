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
  render () {
    const labels = this.props.tests.map(test => test.pair.label);

    const statsForPath = path => {
      const total = this.props.all.filter(
        t => t.pair.label.indexOf(path) === 0
      );

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
    };

    let treeData = labels.reduce((tree, label) => {
      const parts = label.split('/');
      // console.log(parts);

      let currentNode = tree;
      parts.forEach((part, index) => {
        const leadingParts = parts.slice(0, index + 1);
        const path = leadingParts.join('/');
        const stats = statsForPath(path);
        if (!currentNode.hasOwnProperty(part)) {
          currentNode[part] = {
            label: part,
            parts: leadingParts,
            path: path,
            stats: stats,
            nodes: {}
          };
        }
        currentNode = currentNode[part].nodes;
      });
      // console.log(tree);
      return tree;
    }, {});
    // console.log("treeData=", treeData);

    // force there to be a root node if there isn't one
    if (Object.keys(treeData).length > 1) {
      treeData = {
        'All Tests': {
          label: 'All Tests',
          parts: [],
          path: '',
          stats: statsForPath(''),
          nodes: treeData
        }
      };
    }

    const buttonFor = (node, depth) => {
      return <NavigationCard
        key={node.path}
        node={node}
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

    // todo: if there is no hiearchy, don't display nav

    const subLabels = [];
    for (const key in currentNode) {
      const node = currentNode[key];
      // console.log("parsing", node);
      subLabels.push(buttonFor(node, depth));
    }
    return (
      <NavWrapper>
        {breadcrumbs}
        {subLabels}
      </NavWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    tests: state.tests.filtered,
    all: state.tests.all
  };
};

const mapDispatchToProps = dispatch => {
  return {
    navigateTo: path => {
      console.log('navigating to', path);
      dispatch(navigateTests(path));
    }
  };
};

const NavigationContainer = connect(mapStateToProps, mapDispatchToProps)(Navigation);

export default NavigationContainer;
