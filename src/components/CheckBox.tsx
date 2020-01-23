import React, { useState } from 'react';
import styled from 'styled-components';
import { BLUE, TEXT_ORANGE, BACKGROUND_GREY2 } from 'styles/colors';
import { SuccessIcon } from 'assets/icons';

interface Props {
  className?: string;
  checked: boolean;
  name: string;
  error?: boolean;
}

const CheckBox = (props: Props) => {
  const { className, checked: initChecked, name, error = false } = props;
  const [checked, setChecked] = useState(initChecked);

  const handleChange = () => {
    setChecked(!checked);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const doNothing = () => {};

  return (
    <Wrapper onClick={handleChange} checked={checked} error={error} className={className}>
      <Icon />
      <HiddenCheckbox onChange={doNothing} checked={checked} name={name} />
    </Wrapper>
  );
};

export default React.memo(CheckBox);

const getBorderColor = (checked: boolean, error: boolean) => {
  if (error) return TEXT_ORANGE;

  return checked ? 'transparent' : 'rgba(255, 255, 255, 0.3)';
};

const Icon = styled(SuccessIcon)`
  fill: none;
  stroke: white;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Wrapper = styled.div<{ checked: boolean; error: boolean }>`
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
