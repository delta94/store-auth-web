import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader, SignUpForm, Privacy } from 'components';
import {
  BlueLink,
  GreyText,
  StyledSocialButtons,
  FormWrapper,
} from 'styles/common';
import { PLATFORM } from 'const';
import { getUrlWithSearch, isLauncher } from 'helpers';
import styled from 'styled-components';

const SignUp = () => {
  const { t } = useTranslation();

  const formHeader = (
    <>
      <FormHeader title={t('sign-up')} />
      <StyledSocialButtons />
    </>
  );

  const formFooter = (
    <>
      <StyledText>
        {`${t('already-have-account', { platform: PLATFORM })} `}
        <BlueLink to={getUrlWithSearch('/sign-in')}>
          {t('sign-in')}
        </BlueLink>
      </StyledText>
      {!isLauncher && <Privacy />}
    </>
  );

  return (
    <FormWrapper>
      <SignUpForm
        header={formHeader}
        footer={formFooter}
      />
    </FormWrapper>
  );
};

export default React.memo(SignUp);

const StyledText = styled(GreyText)`
  text-align: center;
`;
