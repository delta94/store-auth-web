import React from 'react';
import { FormWrapper, Description } from 'styles/common';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SignInSuccess = () => {
  const { t } = useTranslation();

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-success-title')} />
      <StyledDescription>{t('sign-in-success-description')}</StyledDescription>
    </FormWrapper >
  );
};

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

export default SignInSuccess;
