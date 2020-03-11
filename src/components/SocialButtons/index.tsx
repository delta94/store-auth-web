import React, { useContext } from 'react';
import styled from 'styled-components';
import { SocialButton, Loader } from 'components';
import { AppContext } from 'App';

type Provider = {
  name: string;
}

interface Props {
  className?: string;
}

const SocialButtons = (props: Props) => {
  const { className } = props;
  const { loading, providers } = useContext(AppContext);

  return (
    <Wrapper className={className}>
      {loading && !providers.length
        ? <Loader size={14} color="white" title="Loading..." />
        : providers.map(({ name }) => <SocialButton key={name} name={name} />)
      }
    </Wrapper>
  );
};

export default React.memo(SocialButtons);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
