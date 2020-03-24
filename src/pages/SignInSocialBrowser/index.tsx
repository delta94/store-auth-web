import React, { useEffect } from 'react';
import { FormWrapper, Description, StyledGrayButton } from 'styles/common';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { getLauncherSocialLoginCheckRequest } from 'api';
import { getUrlWithSearch, windowAlias, capitalize } from 'helpers';
import { WEBVIEW_LOADING } from 'const';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { name = '' } = useParams();
  let requestIntervalID: number;

  useEffect(() => {
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

  if (!name) {
    return <Redirect to={getUrlWithSearch('/sign-in')}/>;
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

export default SignInBrowser;
