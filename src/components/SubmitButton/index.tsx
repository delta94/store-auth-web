import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from 'styles/primitives';
import { Loader } from 'components';

interface Props {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

const SubmitButton = (props: Props) => {
  const { className, loading, disabled, children } = props;

  return (
    <Wrapper className={className} disabled={loading || disabled}>
      {loading
        ? <Loader size={14} color="white" />
        : children
      }
    </Wrapper>
  );
};

export default React.memo(SubmitButton);

const Wrapper = styled(Button).attrs({ type: 'submit' })`
  min-height: 46px;
  margin: 24px 0 16px 0;
  padding: 14px 24px;
  text-transform: uppercase;
`;
