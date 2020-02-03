import styled from 'styled-components';

import { BLUE_500, GRAY_800, ORANGE_500 } from './colors';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TinyText = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
`;

export const ErrorText = styled.span`
  font-weight: normal;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: ${ORANGE_500};
`;

export const Button = styled.button<{ color?: string }>`
  width: 100%;
  background: ${({ disabled, color = BLUE_500 }) => disabled ? GRAY_800 : color};
  color: white;
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-align: center;
  cursor: pointer;
  transition: opacity .3s ease-in-out;

  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.8};
  }

  &:active {
    opacity: 1;
  }
`;
