import styled from 'styled-components';
import { BLUE, TEXT_ORANGE, BACKGROUND_GREY2 } from 'styles/colors';
import { SuccessIcon } from 'assets/icons';

const getBorderColor = (checked: boolean, error: boolean) => {
  if (error) return TEXT_ORANGE;

  return checked ? 'transparent' : 'rgba(255, 255, 255, 0.3)';
};

export const Icon = styled(SuccessIcon)`
  fill: none;
  stroke: white;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const Wrapper = styled.div<{ checked: boolean; error: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ checked }) => checked ? BLUE : BACKGROUND_GREY2};
  border-radius: 2px;
  border: 1px solid transparent;
  border-color: ${({ checked, error }) => getBorderColor(checked, error)};
  transition: all 150ms;

  ${Icon} {
    display: ${({ checked }) => checked ? 'block' : 'none'};
  }
`;
