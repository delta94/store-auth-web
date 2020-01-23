import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from 'styles/primitives';
import { FacebookIcon, TwitterIcon } from 'assets/icons';

interface Props {
  className?: string;
}

const SocialButtons = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <StyledButton color="#3B5998">
        <StyledFacebookIcon />
        {t('facebook')}
      </StyledButton>
      <StyledButton color="#1DA1F2">
        <StyledTwitterIcon />
        {t('twitter')}
      </StyledButton>
    </Wrapper>
  );
};

export default React.memo(SocialButtons);

const StyledFacebookIcon = styled(FacebookIcon)`
  width: 24px;
  margin-right: 2px;
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  width: 24px;
  margin-right: 2px;
`;

const StyledButton = styled(Button).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 108px;
  margin-left: 8px;
  padding: 8px 6px;

  &:first-child {
    margin-left: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
