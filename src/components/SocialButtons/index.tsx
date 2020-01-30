import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FACEBOOK, TWITTER } from 'styles/colors';
import { FacebookIcon, TwitterIcon } from 'assets/icons';
import { Button } from 'styles/primitives';

interface Props {
  className?: string;
}

const SocialButtons = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Wrapper className={className}>
      <StyledButton color={FACEBOOK}>
        <FacebookIcon />
        {t('facebook')}
      </StyledButton>
      <StyledButton color={TWITTER}>
        <TwitterIcon />
        {t('twitter')}
      </StyledButton>
    </Wrapper>
  );
};

export default React.memo(SocialButtons);

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

  svg {
    width: 24px;
    margin-right: 2px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
