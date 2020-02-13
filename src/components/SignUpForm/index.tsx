import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { passwordValidate, emailValidate, nameValidate } from 'helpers';
import {
  Form,
  TermsAgree,
  StyledButton,
  StyledCheckbox,
  StyledFormInput,
  StyledLink,
} from 'styles/common';
import { EMAIL, USERNAME, PASSWORD } from 'const';
import useForm from 'hooks/useForm';

interface Props {
  className?: string;
}

const minPasswordLength = process.env.REACT_APP_MIN_PASSWORD_LENGTH;
const signUpFields = [EMAIL, USERNAME, PASSWORD];

const SignUpForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signUpFields);

  const handleAgreeChange = () => {
    setAgree(!agree);
  };

  const isSignUpFormValid = isFormValid && agree;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = { agree, ...getFormSubmitData(event) };
    
    console.log(formData);
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <StyledFormInput
        type="text"
        label={t('display-name')}
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
      <StyledButton disabled={!isSignUpFormValid} type="submit">
        {t('sign-up-button')}
      </StyledButton>
    </Form>
  );
};

export default React.memo(SignUpForm);
