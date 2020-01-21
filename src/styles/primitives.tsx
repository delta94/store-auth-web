import styled from 'styled-components';
import { BLUE } from './colors';

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  width: 100%;
  padding: 14px 24px;
  background: ${BLUE};
  border: 0;
  border-radius: 2px;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: white;
  text-align: center;
`;
