import styled from 'styled-components';
import { Button } from 'styles/primitives';

export const StyledButton = styled(Button).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 108px;
  margin-left: 8px;
  padding: 8px 6px;

  &:first-child {
    margin-left: 0;
  }

  svg {
    width: 24px;
    margin-right: 2px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
