import styled from 'styled-components';
import { BLUE, BACKGROUND_GREY } from './colors';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button<{ color?: string }>`
  width: 100%;
  padding: 14px 24px;
  background: ${({ disabled, color = BLUE }) => disabled ? BACKGROUND_GREY : color};
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
`;
