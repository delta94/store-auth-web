import React from 'react';
import styled from 'styled-components';
import { AnonymousIcon } from 'assets/icons';
import { GRAY_800 } from 'styles/colors';

interface Props {
  className?: string;
  src?: string;
}

const Avatar = (props: Props) => {
  const { className, src } = props;

  return (
    <Wrapper className={className}>
      {src 
        ? <Image src={src} alt="Avatar" />
        : <AnonymousIcon />
      }
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(Avatar, areEqual);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${GRAY_800};
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
`;
