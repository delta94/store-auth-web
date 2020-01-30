import React from 'react';
import styled, { keyframes } from 'styled-components';

interface Props {
  className?: string;
  size?: number;
  color?: string; 
}

const Loader = (props: Props) => {
  const { className, color = 'black', size = 10 } = props;
  const lineWidth = Math.ceil(size / 10);

  return (
    <Wrapper className={className} color={color} size={size} lineWidth={lineWidth} >
      <circle cx={size / 2} cy={size / 2} r={(size - lineWidth) / 2} />
    </Wrapper>
  );
};

export default React.memo(Loader);

const getSpinner = (size: number) => keyframes`
  0% {
    transform: rotate(0deg);
    stroke-dashoffset: ${0.66 * size};
  } 50% {
    transform: rotate(720deg);
    stroke-dashoffset: ${3.14 * size};
  } 100% {
    transform: rotate(1080deg);
    stroke-dashoffset: ${0.66 * size};
  }
`;

const Wrapper = styled.svg<{ size: number; color: string; lineWidth: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  viewBox: ${({ size }) => `0 0 ${size} ${size}`};
  
  circle {
    fill: transparent;
    stroke: ${({ color }) => color};
    stroke-width: ${({ lineWidth }) => lineWidth};
    stroke-linecap: round;
    stroke-dasharray: ${({ size }) => 3.14 * size};
    transform-origin: ${({ size }) => `${size / 2}px ${size / 2}px 0`};;
    animation: ${({ size }) => getSpinner(size)} 2s linear infinite;
  }
`;
