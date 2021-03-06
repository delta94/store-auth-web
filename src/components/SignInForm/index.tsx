import React, { FormEvent, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate, getUrlWithSearch, windowAlias } from 'helpers';
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
import { EMAIL, PASSWORD, WEBVIEW_LOADING } from 'const';
import { useForm } from 'hooks';
import { signInRequest, createLinkSocialRequest } from 'api';
import { SubmitButton } from 'components';
import { AppContext } from 'App';
import { User } from 'types';

interface Props {
  className?: string;
  social?: string;
  token?: string;
  user?: User;
}

const signInFields = [EMAIL, PASSWORD];

const SignInForm = (props: Props) => {
  const { className, token, social, user } = props;
  const { t } = useTranslation();
  const { loading, setLoading } = useContext(AppContext);
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

    const formData = social
      ? { remember, social: token, ...getFormSubmitData(event) }
      : { remember, ...getFormSubmitData(event) };

    const request = social
      ? createLinkSocialRequest(social)
      : signInRequest;

    const { error, param, url } = await request(formData);

    if (!error) {
      windowAlias.ipc?.send(WEBVIEW_LOADING, true);
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
        value={user?.email}
        autoFocus={!!user?.email}
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
