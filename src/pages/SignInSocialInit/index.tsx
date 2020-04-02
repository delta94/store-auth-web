import React, { useEffect, useState } from 'react';
import { FormWrapper, Description, StyledGrayButton } from 'styles/common';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import Centrifuge from 'centrifuge';
import {  getChallenge } from 'api';
import { getUrlWithSearch, windowAlias, capitalize, setCookie, deleteCookie } from 'helpers';
import { WEBVIEW_LOADING } from 'const';
import { BASE_URL, CHALLENGE_KEY } from 'api/const';

type NotificationPayload = {
  status: string;
  url?: string;
}

const loginUrl = `${process.env.REACT_APP_STORE_URL}/api/v1/auth/login`;
const authCallbackUrl = `https://${window.location.host}/auth-callback`;
const socketUrl = `${BASE_URL}/api/providers/ws}`;

const SignInSocialInit = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { name = '' } = useParams();
  const [status, setStatus] = useState<string>();
  const [redirectUrl, setRedirectUrl] = useState<string>();

  const centrifuge = new Centrifuge(socketUrl);

  useEffect(() => {
    setCookie(CHALLENGE_KEY, getChallenge());

    centrifuge.subscribe('notification', (payload: NotificationPayload) => {
      const { status, url } = payload;
      setStatus(status);
      setRedirectUrl(url);
    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
      deleteCookie(CHALLENGE_KEY);
    };
  }, []);

  const handleCancel = () => {
    history.push(getUrlWithSearch('/sign-in'));
  };

  const handleTryAgain = () => {
    window.location.href = `${loginUrl}?redirect=${authCallbackUrl}`;
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

export default SignInSocialInit;
