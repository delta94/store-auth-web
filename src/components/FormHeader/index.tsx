import React from 'react';
import { LogoIcon } from 'assets/icons';

import { Wrapper, Title } from './style';

interface Props {
  className?: string;
  title: string;
}

const FormHeader = (props: Props) => {
  const { className, title } = props;

  return (
    <Wrapper className={className}>
      <LogoIcon />
      <Title>
        {title}
      </Title>
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev.title === next.title;

export default React.memo(FormHeader, areEqual);
