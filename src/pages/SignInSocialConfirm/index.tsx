import React, { useState } from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader, Loader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getLuancherSocialLoginConfirmRequest } from 'api';
import { getUrlParameter } from 'helpers';

const SignInSocialConfirm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState();

  const handleContinue = async () => {
    setLoading(true);

    const response = await getLuancherSocialLoginConfirmRequest(getUrlParameter('name'));

    setLoaded(true);
    setLoading(false);
    setStatus(response?.status);
  };

  if (loading) {
    return <Loader color="white" size={14}/>;
  }

  if (loaded) {
    return (
      <StyledWrapper>
        <FormHeader
          title={status === 'success' ? t('sign-in-success-title') : t('sign-in-fail-title')}
        />
        <StyledDescription>
          {status === 'success' ? t('sign-in-success-description') : t('sign-in-fail-description')}
        </StyledDescription>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <FormHeader title={t('sign-in-confirm-title')} />
      <StyledDescription>{t('sign-in-confirm-description')}</StyledDescription>
      <StyledButton onClick={handleContinue}>{t('continue')}</StyledButton>
    </StyledWrapper>
  );
};

const StyledWrapper = styled(FormWrapper)`
  min-height: auto;
`;

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  min-height: 46px;
  margin: 24px 0 16px 0;
  text-transform: uppercase;
`;

export default SignInSocialConfirm;
