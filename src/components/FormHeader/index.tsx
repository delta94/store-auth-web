import React from 'react';
import styled from 'styled-components';
import { LogoIcon } from 'assets/icons';

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

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
`;

const Title = styled.h1`
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 23px;
  line-height: 32px;
`;
