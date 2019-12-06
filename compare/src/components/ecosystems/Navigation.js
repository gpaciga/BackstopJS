// requires react-simple-tree-menu

import React from 'react';
// import styled from 'styled-components';
import { connect } from 'react-redux';
// import { TreeMenu } from 'react-simple-tree-menu';
import { navigateTests } from '../../actions';

class Navigation extends React.Component {
  render () {
    const labels = this.props.tests.map(test => test.pair.label);

    /* TreeMenu does not work
    // convert into an object
    const treeData = labels.reduce((tree, label) => {
        const parts = label.split("/");
        console.log(parts);

        let current_node = tree;
        parts.forEach(part => {
            if (!current_node.hasOwnProperty(part)) {
                current_node[part] = {
                    label: part,
                    nodes: {}
                };
            }
            current_node = current_node[part].nodes;
        })
        console.log(tree);
        return tree;
    }, {});
    console.log("treeData=", treeData);

    const demo = {
        'first-level-node-1': {               // key
            label: 'Node 1 at the first level',
            index: 0, // decide the rendering order on the same level
            nodes: {
                'second-level-node-1': {
                label: 'Node 1 at the second level',
                index: 0,
                nodes: {
                    'third-level-node-1': {
                        label: 'Node 1 at the third level',
                        index: 0,
                        nodes: {} // you can remove the nodes property or leave it as an empty array
                        },
                    },
                },
            },
        },
        'first-level-node-2': {
            label: 'Node 2 at the first level',
            index: 1,
        },
    };

    console.log(TreeMenu);
    return <TreeMenu data={demo} />;
    */

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

    const treeData = labels.reduce((tree, label) => {
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

    const buttonFor = node => {
      return (
        <button
          key={node.path}
          onClick={() => this.props.navigateTo(node.path)}
        >
          {node.label} ({node.stats.pass} pass/{node.stats.fail} fail/{node.stats.total} total)
        </button>
      );
    };

    let breadcrumbs = [];
    // dive into the tree to get the first split
    let currentNode = treeData;
    while (Object.keys(currentNode).length === 1) {
      const key = Object.keys(currentNode)[0];
      const node = currentNode[key];
      breadcrumbs.push(buttonFor(node));
      currentNode = node.nodes;
    }

    const subLabels = [];
    for (const key in currentNode) {
      const node = currentNode[key];
      // console.log("parsing", node);
      subLabels.push(
        <li key={node.path}>
          {buttonFor(node)}
        </li>
      );
    }
    return (
      <div>
        <ul>{breadcrumbs}</ul>
        <ul>{subLabels}</ul>
      </div>
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
