import React from 'react';
import styled from 'styled-components';
import { colors } from '../../styles';

const PassMeterContainer = styled.span`
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

export default class PassMeter extends React.Component {
  render () {
    const { pass, fail, total } = this.props.stats;
    const failFraction = fail / total;
    const passFraction = pass / total;
    return (
      <PassMeterContainer>
        <FailingFraction fraction={failFraction} />
        <PassingFraction fraction={passFraction} />
      </PassMeterContainer>
    );
  }
}
