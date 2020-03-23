import React from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SignInSuccess = () => {
  const { t } = useTranslation();

  const handleClose = () => {
    close();
  };

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-success-title')} />
      <StyledDescription>{t('sign-in-success-description')}</StyledDescription>
      <StyledButton onClick={handleClose}>close</StyledButton>
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
export default SignInSuccess;
