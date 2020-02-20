import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader, SignInForm, Privacy } from 'components';
import {
  GreyText,
  StyledSocialButtons,
  FormWrapper,
  BlueLink,
  StyledAuthSkip,
} from 'styles/common';
import { PLATFORM } from 'const';
import { getUrlWithSearch, isElectron, windowAlias } from 'helpers';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  const handleSkipAuth = () => {
    if (windowAlias.interop) {
      windowAlias.interop.skipAuth();
    }
  };

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('sign-in')} />
      <StyledSocialButtons />
      <SignInForm />
      <GreyText>
        {`${t('dont-have-account', { platform: PLATFORM })}? `}
        <BlueLink to={getUrlWithSearch('/sign-up')}>
          {t('sign-up')}
        </BlueLink>
        {isElectron && (
          <>
            {` ${t('or')} `}
            <StyledAuthSkip onClick={handleSkipAuth}>{t('sign-in-later')}</StyledAuthSkip>
          </>
        )}
      </GreyText>
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignIn);
