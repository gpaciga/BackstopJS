import React from 'react';
import styled from 'styled-components';

import { colors, shadows } from '../../styles';
import PassMeter from '../molecules/PassMeter';

const NavButton = styled.button`
  position: relative;
  margin: 0px;
  margin-left: ${props => props.indentation * 25}px;
  padding: 5px 16px;
  background-color: ${colors.cardWhite};
  box-shadow: ${shadows.shadow01};
  min-height: 16px;
  break-inside: avoid;
  display: block;
  width: calc(100% - ${props => props.indentation * 25}px);
  text-align: left;

  &:before {
    content: '';
    display: block;
    width: 8px;
    height: 100%;
    background-color: ${props => props.status === 'pass' ? colors.green : colors.red};
    position: absolute;
    top: 0;
    left: 0;
  }

  @media print {
    box-shadow: none;
  }
`;

const Stats = styled.span`
    float: right;
`;

export default class NavigationCard extends React.Component {
  render () {
    const node = this.props.node;
    const status = node.stats.fail === 0 ? 'pass' : 'fail';
    return (
      <NavButton
        key={node.path}
        status={status}
        indentation={this.props.depth}
        onClick={() => this.props.navigateTo(this.props.mode, node.path)}
      >
        <span className="label">{node.label}</span>
        <Stats>
          <span className="stats">{node.stats.fail} fail / {node.stats.pass} pass / {node.stats.total} total</span>
          <PassMeter stats={node.stats} />
        </Stats>
      </NavButton>
    );
  }
}
