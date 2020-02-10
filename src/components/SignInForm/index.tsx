import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate } from 'helpers';
import { TinyText } from 'styles/primitives';
import {
  Form,
  WideRow,
  BlueLink,
  Remember,
  StyledButton,
  StyledCheckbox,
  StyledFormInput,
} from 'styles/common';
import { EMAIL, PASSWORD } from 'const';
import useForm from 'hooks/useForm';

interface Props {
  className?: string;
}

const signInFields = [EMAIL, PASSWORD];

const SignInForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signInFields);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = { remember, ...getFormSubmitData(event) };

    console.log(formData);
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
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
          <BlueLink to="/password-reset">
            {t('forgot-password')}?
          </BlueLink>
        </TinyText>
      </WideRow>
      <StyledButton disabled={!isFormValid} type="submit">
        {t('sign-in')}
      </StyledButton>
    </Form>
  );
};

export default React.memo(SignInForm);
