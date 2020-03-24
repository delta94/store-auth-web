import React from 'react';
import { FormWrapper, Description, StyledGrayButton } from 'styles/common';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { getUrlWithSearch } from 'helpers';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleTryAgain = () => {
    history.push(getUrlWithSearch('/sign-in'));
  };

  return (
    <FormWrapper>
      <FormHeader title={t('sign-in-expired-title')} />
      <StyledDescription>{t('sign-in-expired-description')}</StyledDescription>
      <StyledGrayButton color="transparent" onClick={handleTryAgain}>{t('try-again')}</StyledGrayButton>
    </FormWrapper>
  );
};

const StyledDescription = styled(Description)`
  margin-top: 15px;
`;

export default SignInBrowser;
