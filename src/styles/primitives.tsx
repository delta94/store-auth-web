import styled from 'styled-components';

import { PURPLE_500, GRAY_800, ORANGE_500 } from './colors';
import { isLauncher } from 'helpers';

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

export const Caps10 = styled.span`
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
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
  background: ${({ disabled, color = PURPLE_500 }) => disabled ? GRAY_800 : color};
  color: white;
  border: 0;
  border-radius: ${isLauncher ? '4px' : '2px'};
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-align: center;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: opacity .3s ease-in-out;

  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.8};
  }

  &:active {
    opacity: 1;
  }
`;
