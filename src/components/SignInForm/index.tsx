import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate, getUrlWithSearch } from 'helpers';
import { TinyText } from 'styles/primitives';
import {
  Form,
  WideRow,
  BlueLink,
  Remember,
  StyledCheckbox,
  StyledFormInput,
  StyledFormError,
} from 'styles/common';
import { EMAIL, PASSWORD } from 'const';
import useForm from 'hooks/useForm';
import { request } from 'api';
import { SIGN_IN } from 'api/const';
import { SubmitButton } from 'components';

interface Props {
  className?: string;
}

const signInFields = [EMAIL, PASSWORD];

const SignInForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [remember, setRemember] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signInFields);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    setLoading(true);
    setFormError('');
    
    const formData = { remember, ...getFormSubmitData(event) };
    const responce = await request(SIGN_IN, formData);
    const { error, param, url } = responce;

    if (!error) {
      window.location.href = url;
      return;
    }

    if (param && errors[param]) {
      handleErrorsChange(param, t(error));
    } else {
      setFormError(t(error));
    }

    setLoading(false);
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <StyledFormError message={formError} />
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
          <BlueLink to={getUrlWithSearch('/password-reset')}>
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
