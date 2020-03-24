import React from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { getLuancherSocialLoginConfirmRequest } from 'api';
import { getUrlParameter } from 'helpers';
import { useHistory } from 'react-router-dom';

const SignInConfirm = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleContinue = async () => {
    await getLuancherSocialLoginConfirmRequest(getUrlParameter('name'));
    history.push('/social-sign-in-success');
  };

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-confirm-title')} />
      <StyledDescription>{t('sign-in-confirm-description')}</StyledDescription>
      <StyledButton onClick={handleContinue}>{t('continue')}</StyledButton>
    </FormWrapper >
  );
};

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

const StyledButton = styled(Button)`
  min-height: 46px;
  margin: 24px 0 16px 0;
  text-transform: uppercase;
`;

export default SignInConfirm;