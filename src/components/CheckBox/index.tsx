import React from 'react';

import { Wrapper, Icon, HiddenCheckbox } from './style';

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
      <Icon />
      <HiddenCheckbox onChange={doNothing} checked={checked} name={name} />
    </Wrapper>
  );
};

export default React.memo(CheckBox);
