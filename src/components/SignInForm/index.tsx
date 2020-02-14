import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate } from 'helpers';
import { TinyText } from 'styles/primitives';
import {
  Form,
  WideRow,
  BlueLink,
  Remember,
  StyledCheckbox,
  StyledFormInput,
} from 'styles/common';
import { EMAIL, PASSWORD } from 'const';
import useForm from 'hooks/useForm';
import { request } from 'api';
import { SIGN_IN } from 'api/constants';
import { SubmitButton } from 'components';

interface Props {
  className?: string;
}

const signInFields = [EMAIL, PASSWORD];

const SignInForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signInFields);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = { remember, ...getFormSubmitData(event) };

    setLoading(true);
    const responce = await request(SIGN_IN, formData);

    await new Promise(res => setTimeout(() => res(), 2000));

    setLoading(false);
    console.log(responce);
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
      <SubmitButton disabled={!isFormValid} loading={loading}>
        {t('sign-in')}
      </SubmitButton>
    </Form>
  );
};

export default React.memo(SignInForm);
