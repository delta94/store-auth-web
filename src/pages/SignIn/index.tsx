import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate } from 'helpers';
import { FormHeader } from 'components';
import { TinyText } from 'styles/primitives';

import {
  Form,
  WideRow,
  BlueLink,
  GreyText,
  Privacy,
  Remember,
  StyledButton,
  StyledCheckbox,
  StyledFormInput,
  StyledLink,
  StyledSocialButtons,
} from '../styles/common';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);

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

  const handleRememberChange = () => {
    setRemember(!remember);
  };

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

    console.log({
      email, password, remember,
    });
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <FormHeader title={t('sign-in')} />
      <StyledSocialButtons />
      <StyledFormInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
      />
      <StyledFormInput
        type="password"
        label={t('password')}
        name="password"
        error={errors.password.value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
      />
      <WideRow>
        <Remember>
          <StyledCheckbox checked={remember} onChange={handleRememberChange} name="remember" />
          <TinyText>{t('remember')}</TinyText>
        </Remember>
        <TinyText>
          <BlueLink to="/reset-password">
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
    </Form>
  );
};

export default React.memo(SignIn);
