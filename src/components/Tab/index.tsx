import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  label: string;
  children: ReactNode;
}

const Tab = (props: Props) => {
  const { className, children } = props;

  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

export default React.memo(Tab);

const Wrapper = styled.div``;
