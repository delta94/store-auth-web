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

interface Props {
  className?: string;
}

const SignUp = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('sign-up')} />
      <StyledSocialButtons />
      <SignUpForm />
      <GreyText>
        {`${t('already-have-account', { platform: PLATFORM })} `}
        <BlueLink to="sign-in">
          {t('sign-in')}
        </BlueLink>
      </GreyText>
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignUp);
