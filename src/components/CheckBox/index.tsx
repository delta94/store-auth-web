import React from 'react';
import styled from 'styled-components';
import { BLUE_500, ORANGE_500, GRAY_900 } from 'styles/colors';
import { SuccessIcon } from 'assets/icons';

interface Props {
  className?: string;
  checked: boolean;
  onChange: () => void;
  name: string;
  error?: boolean;
}

const CheckBox = (props: Props) => {
  const { className, checked, onChange, name, error = false } = props;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const doNothing = () => {};

  return (
    <Wrapper onClick={onChange} checked={checked} error={error} className={className}>
      <StyledSuccessIcon />
      <HiddenCheckbox onChange={doNothing} checked={checked} name={name} />
    </Wrapper>
  );
};

export default React.memo(CheckBox);

const getBorderColor = (checked: boolean, error: boolean) => {
  if (error) return ORANGE_500;

  return checked ? 'transparent' : 'rgba(255, 255, 255, 0.3)';
};

const StyledSuccessIcon = styled(SuccessIcon)`
  fill: none;
  stroke: white;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Wrapper = styled.div<{ checked: boolean; error: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ checked }) => checked ? BLUE_500 : GRAY_900};
  border-radius: 2px;
  border: 1px solid transparent;
  border-color: ${({ checked, error }) => getBorderColor(checked, error)};
  transition: all 150ms;
  cursor: pointer;

  ${StyledSuccessIcon} {
    display: ${({ checked }) => checked ? 'block' : 'none'};
  }
`;
