import React from 'react';
import styled from 'styled-components';

import { colors, shadows } from '../../styles';

const StyledButton = styled.button`
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

const PassMeter = styled.span`
    height: 10px;
    width: 150px;
    margin: 0px 10px;
    display: inline-block;
`;

const PassingFraction = styled.span`
    display: inline-block;
    height: 100%;
    width: ${props => props.fraction * 100}%;
    background-color: ${colors.green};
`;

const FailingFraction = styled.span`
    display: inline-block;
    height: 100%;
    width: ${props => props.fraction * 100}%;
    background-color: ${colors.red};
`;

class StatusBar extends React.Component {
  render () {
    const { pass, fail, total } = this.props.stats;
    const failFraction = fail / total;
    const passFraction = pass / total;
    return (
      <PassMeter>
        <FailingFraction fraction={failFraction} />
        <PassingFraction fraction={passFraction} />
      </PassMeter>
    );
  }
}

export default class NavigationCard extends React.Component {
  render () {
    const node = this.props.node;
    const status = node.stats.fail === 0 ? 'pass' : 'fail';
    return (
      <StyledButton
        key={node.path}
        status={status}
        indentation={this.props.depth}
        onClick={() => this.props.navigateTo(node.path)}
      >
        <span className="label">{node.label}</span>
        <Stats>
          <span className="stats">{node.stats.pass} pass / {node.stats.fail} fail / {node.stats.total} total</span>
          <StatusBar stats={node.stats} />
        </Stats>
      </StyledButton>
    );
  }
}
