import React, { useEffect } from 'react';
import { windowAlias } from 'helpers';
import { FormHeader } from 'components';
import { AUTH_CALLBACK } from 'const';
import { useTranslation } from 'react-i18next';
import { FormWrapper, Description } from 'styles/common';
import styled from 'styled-components';

const AuthCallback = () => {
  const { t } = useTranslation();

  useEffect(() => {
    windowAlias.ipc?.send(AUTH_CALLBACK);
  }, []);

  return (
    <StyledFormWrapper>
      <FormHeader title={t('sign-in-success-title')} />
      <Description>{t('you-are-sign-in')}</Description>
    </StyledFormWrapper>
  );
};

export default AuthCallback;

const StyledFormWrapper = styled(FormWrapper)`
  min-height: auto;
`;
