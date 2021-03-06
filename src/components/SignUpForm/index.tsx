import React, { FormEvent, useState, ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate, nameValidate, checkCaptchaRequired, windowAlias } from 'helpers';
import {
  Form,
  TermsAgree,
  StyledCheckbox,
  StyledFormInput,
  StyledLink,
  StyledFormError,
  HideableWrapper,
} from 'styles/common';
import { EMAIL, USERNAME, PASSWORD, WEBVIEW_LOADING } from 'const';
import { useForm } from 'hooks';
import { signUpRequest, createSignUpSocialRequest } from 'api';
import { SubmitButton, Captcha } from 'components';
import { AppContext } from 'App';

interface Props {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
  social?: string;
  token?: string;
}

const minPasswordLength = process.env.REACT_APP_MIN_PASSWORD_LENGTH;
const signUpFields = [EMAIL, USERNAME, PASSWORD];

const SignUpForm = (props: Props) => {
  const { className, header, footer, token, social } = props;
  const isCaptchaDisabled = !!social;
  const [showCaptcha, setShowCaptcha] = useState(false);
  const { t } = useTranslation();
  const { loading, setLoading } = useContext(AppContext);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [agree, setAgree] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signUpFields);

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const isSignUpFormValid = isFormValid && agree;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setFormError('');

    const data = social
      ? { agree, social: token, ...getFormSubmitData(event) }
      : { agree, ...getFormSubmitData(event) };

    const request = social
      ? createSignUpSocialRequest(social)
      : signUpRequest;

    const { error, param, url } = await request(data);

    if (!error) {
      windowAlias.ipc?.send(WEBVIEW_LOADING, true);
      window.location.href = url;
      return;
    }

    if (checkCaptchaRequired(error) && !isCaptchaDisabled) {
      setLoading(false);
      setShowCaptcha(true);
      setFormData(data);
      return;
    }

    if (param && errors[param]) {
      handleErrorsChange(param, t(error));
    } else {
      setFormError(t(error));
    }

    setLoading(false);
    setShowCaptcha(false);
  };

  const handleCaptchaSuccess = async (captchaToken: string | null) => {
    setLoading(true);
    setFormError('');

    const data = { ...formData, captchaToken };

    const request = social
      ? createSignUpSocialRequest(social)
      : signUpRequest;

    const { error, param, url } = await request(data);

    if (!error) {
      windowAlias.ipc?.send(WEBVIEW_LOADING, true);
      window.location.href = url;
      return;
    }

    if (checkCaptchaRequired(error) && !isCaptchaDisabled) {
      setLoading(false);
      setShowCaptcha(true);
      setFormData(data);
      return;
    }

    if (param && errors[param]) {
      handleErrorsChange(param, t(error));
    } else {
      setFormError(t(error));
    }

    setLoading(false);
    setShowCaptcha(false);
  };

  return (
    <>
      {!social && (
        <HideableWrapper hide={!showCaptcha}>
          <Captcha
            onSubmit={handleCaptchaSuccess}
          />
        </HideableWrapper>
      )}
      <HideableWrapper hide={showCaptcha}>
        {header}
        <Form className={className} onSubmit={handleSubmit}>
          <StyledFormError message={formError} />
          <StyledFormInput
            type="text"
            label={t('username')}
            name={USERNAME}
            error={errors[USERNAME].value}
            validate={nameValidate}
            onValidate={handleErrorsChange}
            validationType="debounce"
            isSuccessed={!errors[USERNAME].value && errors[USERNAME].touched}
          />
          <StyledFormInput
            type="text"
            label={t('email')}
            name={EMAIL}
            error={errors[EMAIL].value}
            validate={emailValidate}
            onValidate={handleErrorsChange}
            isSuccessed={!errors[EMAIL].value && errors[EMAIL].touched}
          />
          <StyledFormInput
            type="password"
            label={t('password')}
            name={PASSWORD}
            error={errors[PASSWORD].value}
            validate={passwordValidate}
            onValidate={handleErrorsChange}
            isSuccessed={!errors[PASSWORD].value && errors[PASSWORD].touched}
            tooltip={t('password-tooltip', { minPasswordLength })}
          />
          <TermsAgree>
            <StyledCheckbox checked={agree} onChange={handleAgreeChange} name="agree" />
            {t('terms-agree')}&ensp;
            <StyledLink to="/terms-of-use">
              {t('terms-of-use')}
            </StyledLink>
          </TermsAgree>
          <SubmitButton disabled={!isSignUpFormValid} loading={loading}>
            {t('sign-up-button')}
          </SubmitButton>
        </Form>
        {footer}
      </HideableWrapper>
    </>
  );
};

export default React.memo(SignUpForm);
