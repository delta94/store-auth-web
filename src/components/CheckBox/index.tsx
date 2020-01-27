import React, { useState } from 'react';

import { Wrapper, Icon, HiddenCheckbox } from './style';

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
