import React from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GRAY_TEXT } from 'styles/colors';
import { useHistory } from 'react-router-dom';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleTryAgain = () => {
    history.push('/sign-in');
  };

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-expired-title')} />
      <StyledDescription>{t('sign-in-expired-description')}</StyledDescription>
      <StyledButton color="transparent" onClick={handleTryAgain}>{t('try-again')}</StyledButton>
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
