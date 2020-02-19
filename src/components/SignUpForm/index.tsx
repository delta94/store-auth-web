import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate, nameValidate } from 'helpers';
import {
  Form,
  TermsAgree,
  StyledCheckbox,
  StyledFormInput,
  StyledLink,
  StyledFormError,
} from 'styles/common';
import { EMAIL, USERNAME, PASSWORD } from 'const';
import useForm from 'hooks/useForm';
import { SIGN_UP } from 'api/const';
import { request } from 'api';
import { SubmitButton } from 'components';

interface Props {
  className?: string;
}

const minPasswordLength = process.env.REACT_APP_MIN_PASSWORD_LENGTH;
const signUpFields = [EMAIL, USERNAME, PASSWORD];

const SignUpForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
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

    const formData = { agree, ...getFormSubmitData(event) };
    const { error, param, url } = await request(SIGN_UP, formData);

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
  );
};

export default React.memo(SignUpForm);
