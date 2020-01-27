import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate } from 'helpers';
import { FormHeader } from 'components';
import { TinyText } from 'styles/primitives';

import {
  Wrapper,
  WideRow,
  BlueLink,
  GreyText,
  Privacy,
  Remember,
  StyledButton,
  StyledCheckbox,
  StyledInput,
  StyledLink,
  StyledSocialButtons,
} from './style';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: {
      value: '',
      touched: false,
    },
    password: {
      value: '',
      touched: false,
    },
  });

  const handleErrorsChange = (field: string, value: string) => {
    setErrors({
      ...errors,
      [field]: {
        value,
        touched: true,
      },
    });
  };

  const isFormValid = Object.values(errors).every(({ value, touched }) => !value && touched);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form: any = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const remember = form.remember.checked;

    console.log({
      email, password, remember,
    });
  };

  return (
    <Wrapper className={className} onSubmit={handleSubmit}>
      <FormHeader title={t('sign-in')} />
      <StyledSocialButtons />
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
      />
      <StyledInput
        type="password"
        label={t('password')}
        name="password"
        error={errors.password.value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
      />
      <WideRow>
        <Remember>
          <StyledCheckbox checked={false} name="remember" />
          <TinyText>{t('remember')}</TinyText>
        </Remember>
        <TinyText>
          <BlueLink to="/forgot">
            {t('forgot-password')}?
          </BlueLink>
        </TinyText>
      </WideRow>
      <StyledButton disabled={!isFormValid} type="submit">
        {t('sign-in')}
      </StyledButton>
      <GreyText>
        {`${t('dont-have-account')}? `}
        <BlueLink to="sign-up">
          {t('sign-up')}
        </BlueLink>!
      </GreyText>
      <Privacy>
        <StyledLink to="/privacy-policy">
          <GreyText>
            {t('privacy-policy')}
          </GreyText>
        </StyledLink>
      </Privacy>
    </Wrapper>
  );
};

export default React.memo(SignIn);
