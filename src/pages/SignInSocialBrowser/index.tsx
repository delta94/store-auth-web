import React, { useEffect } from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GRAY_TEXT } from 'styles/colors';
import { useHistory } from 'react-router-dom';
import { getLauncherSocialLoginCheckRequest } from 'api';
import { getUrlWithSearch } from 'helpers';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const history = useHistory();
  let requestIntervalID: number;

  useEffect(() => {
    requestIntervalID = setInterval(async () => {
      const { status, url } = await getLauncherSocialLoginCheckRequest('facebook');

      console.log('get status', status);
      console.log('get url', url);

      if (status === 'success') {
        console.log('get SUCCESS');
        clearInterval(requestIntervalID);
        window.location.href = url.url;
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
      <FormHeader title={t('sign-in-with', { platform: 'Facebook' })} />
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
