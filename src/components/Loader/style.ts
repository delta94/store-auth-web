import styled, { keyframes } from 'styled-components';

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

export const Wrapper = styled.svg<{ size: number; color: string; lineWidth: number }>`
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
