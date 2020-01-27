import React from 'react';
import { TinyText } from 'styles/primitives';

import { Wrapper, Icon, Title } from './style';

interface Props {
  className?: string;
  title: string;
  disabled?: boolean;
}

const Tooltip = (props: Props) => {
  const { className, title, disabled = false } = props;

  return (
    <Wrapper className={className}>
      <Icon />
      {!disabled && (
        <Title>
          <TinyText>{title}</TinyText>
        </Title>
      )}
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev.disabled === next.disabled;

export default React.memo(Tooltip, areEqual);
