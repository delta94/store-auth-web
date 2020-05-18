import React from 'react';
import styled from 'styled-components';
import { PURPLE_500, ORANGE_500, GRAY_900 } from 'styles/colors';
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
  const doNothing = () => { };

  return (
    <Wrapper
      tabIndex={1}
      onClick={onChange}
      checked={checked}
      error={error}
      className={className}
      aria-label={`${name} checkbox`}
    >
      <StyledSuccessIcon checked={checked} />
      <HiddenCheckbox onChange={doNothing} checked={checked} name={name} />
    </Wrapper>
  );
};

export default React.memo(CheckBox);

const getBorderColor = (checked: boolean, error: boolean) => {
  if (error) return ORANGE_500;

  return checked ? 'transparent' : 'rgba(255, 255, 255, 0.3)';
};

const StyledSuccessIcon = styled(SuccessIcon) <{ checked: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 14px;
  fill: none;
  stroke: white;
  display: ${({ checked }) => checked ? 'block' : 'none'};
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Wrapper = styled.button.attrs({ type: 'button' }) <{ checked: boolean; error: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => checked ? PURPLE_500 : GRAY_900};
  border-radius: 2px;
  border: 1px solid transparent;
  border-color: ${({ checked, error }) => getBorderColor(checked, error)};
  transition: all 150ms;
  outline: none;
  cursor: pointer;
`;
