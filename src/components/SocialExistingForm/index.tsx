import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Input, SubmitButton } from 'components';
import { passwordValidate } from 'helpers';
import { TinyText } from 'styles/primitives';
import {
  Form,
  WideRow,
  BlueLink,
  Remember,
  StyledCheckbox,
  StyledFormInput,
} from 'styles/common';
import { PASSWORD } from 'const';
import useForm from 'hooks/useForm';

interface Props {
  className?: string;
  email: string;
}

const signInFields = [PASSWORD];

const SignInForm = (props: Props) => {
  const { className, email } = props;
  const { t } = useTranslation();
  // const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signInFields);

  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const formData = { remember, email, ...getFormSubmitData(event) };

    console.log(formData);
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        label={t('email')}
        name="email"
        value={email}
        disabled
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
      <SubmitButton disabled={!isFormValid}>
        {t('sign-in')}
      </SubmitButton>
    </Form>
  );
};

export default React.memo(SignInForm);

const StyledInput = styled(Input)`
  width: 400px;
`;
