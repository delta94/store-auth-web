import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader, SignInForm, Privacy } from 'components';
import {
  GreyText,
  StyledSocialButtons,
  FormWrapper,
  BlueLink,
} from 'styles/common';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('sign-in')} />
      <StyledSocialButtons />
      <SignInForm />
      <GreyText>
        {`${t('dont-have-account')}? `}
        <BlueLink to="sign-up">
          {t('sign-up')}
        </BlueLink>!
      </GreyText>
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignIn);
