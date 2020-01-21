import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const Button = (props: Props) => {
  const { className, children } = props;

  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button.attrs({ type: 'submit' })`
  
`;
