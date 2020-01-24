import styled from 'styled-components';

import { BLUE, BACKGROUND_GREY, TEXT_ORANGE } from './colors';

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
  color: ${TEXT_ORANGE};
`;

export const Button = styled.button<{ color?: string }>`
  width: 100%;
  background: ${({ disabled, color = BLUE }) => disabled ? BACKGROUND_GREY : color};
  color: white;
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-align: center;
  cursor: pointer;

  &:hover {
    opacity: ${({ disabled }) => disabled ? 1 : 0.8};
  }

  &:active {
    opacity: 1;
  }
`;
