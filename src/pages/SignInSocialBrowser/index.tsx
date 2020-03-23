import React, { useEffect } from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GRAY_TEXT } from 'styles/colors';
import { useHistory, useLocation } from 'react-router-dom';
import { getLauncherSocialLoginCheckRequest } from 'api';
import { getUrlWithSearch, windowAlias, capitalize } from 'helpers';
import { WEBVIEW_LOADING } from 'const';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const location = useLocation();
  const name = (location.state as any)?.name;
  let requestIntervalID: number;

  useEffect(() => {
    if (!name) {
      history.push(getUrlWithSearch('/sign-in'));
      return;
    }

    requestIntervalID = setInterval(async () => {
      const { status, url } = await getLauncherSocialLoginCheckRequest(name);

      if (status === 'success') {
        windowAlias.ipc?.send(WEBVIEW_LOADING, true);
        clearInterval(requestIntervalID);
        windowAlias.location.href = url;
      }

      if (status === 'expired') {
        clearInterval(requestIntervalID);
        history.push(getUrlWithSearch('/social-sign-in-expired'));
      }

    }, 2000);
  }, []);

  const handleCancel = () => {
    clearInterval(requestIntervalID);
    history.push(getUrlWithSearch('/sign-in'));
  };

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-with', { platform: capitalize(name) })} />
      <StyledDescription>{t('sign-in-browser')}</StyledDescription>
      <StyledButton color="transparent" onClick={handleCancel}>{t('cancel')}</StyledButton>
    </FormWrapper>
  );
};

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  border: 1px solid ${GRAY_TEXT};
  min-height: 46px;
  margin: 24px 0 16px 0;
  text-transform: uppercase;
`;

export default SignInBrowser;
