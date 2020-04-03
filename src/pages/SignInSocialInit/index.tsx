import React from 'react';
import { FormWrapper, Description, StyledGrayButton } from 'styles/common';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { getUrlWithSearch, windowAlias, capitalize } from 'helpers';
import { WEBVIEW_LOADING } from 'const';
import { LOGIN_URL, AUTH_CALLBACK_URL } from 'api/const';
import { useSocialSignIn } from 'hooks';

const SignInSocialInit = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { name = '' } = useParams();
  const { status, redirectUrl } = useSocialSignIn();

  console.log('SignInSocialInit');
  console.log('status', status);
  console.log('redirectUrl', redirectUrl);

  const handleCancel = () => {
    history.push(getUrlWithSearch('/sign-in'));
  };

  const handleTryAgain = () => {
    window.location.href = `${LOGIN_URL}?redirect=${AUTH_CALLBACK_URL}`;
  };

  if (status === 'success') {
    windowAlias.ipc?.send(WEBVIEW_LOADING, true);
    windowAlias.location.href = redirectUrl;

    return null;
  }

  if (status === 'expired') {
    <FormWrapper>
      <FormHeader title={t('sign-in-expired-title')} />
      <StyledDescription>{t('sign-in-expired-description')}</StyledDescription>
      <StyledGrayButton color="transparent" onClick={handleTryAgain}>{t('try-again')}</StyledGrayButton>
    </FormWrapper>;
  }

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-with', { platform: capitalize(name) })} />
      <StyledDescription>{t('sign-in-browser')}</StyledDescription>
      <StyledGrayButton color="transparent" onClick={handleCancel}>{t('cancel')}</StyledGrayButton>
    </FormWrapper>
  );
};

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

export default React.memo(SignInSocialInit);
