import React from 'react';
import styled from 'styled-components';
import { Row, TinyText } from 'styles/primitives';
import { ErrorIcon } from 'assets/icons';
import { ORANGE_500 } from 'styles/colors';

interface Props {
  className?: string;
  message?: string;
}

const FormError = (props: Props) => {
  const { className, message } = props;

  if (!message) return null;

  return (
    <Wrapper className={className}>
      <IconWrapper>
        <StyledErrorIcon />
      </IconWrapper>
      <Message>
        {message}
      </Message>
    </Wrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev.message === next.message;

export default React.memo(FormError, areEqual);

const Wrapper = styled(Row)`
  width: 100%;
  align-items: stretch;
  justify-content: center;
  padding: 10px;
  background-color: ${ORANGE_500};
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 4px;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  width: 10px;
  height:10px;
`;

const Message = styled(TinyText)`
  color: white;
`;
