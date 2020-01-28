import React from 'react';
import { useTranslation } from 'react-i18next';
import { FACEBOOK, TWITTER } from 'styles/colors';
import { FacebookIcon, TwitterIcon } from 'assets/icons';

import { Wrapper, StyledButton } from './style';

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
