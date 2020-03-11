import React, { useState } from 'react';
import { FormWrapper, Description } from 'styles/common';
import { Button } from 'styles/primitives';
import { FormHeader } from 'components';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GRAY_TEXT } from 'styles/colors';
import { useHistory, Redirect } from 'react-router-dom';

const SignInBrowser = () => {
  const { t } = useTranslation();
  const [expired, setExpired] = useState();
  const history = useHistory();

  const handleCancel = () => {
    // close socket
    history.push('/sign-in');
  };

  if (expired) {
    return <Redirect to={'/sign-in-social-expired'} />;
  }

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
