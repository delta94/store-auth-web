import React, { FormEvent, useState, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Input, SubmitButton } from 'components';
import { passwordValidate, getUrlWithSearch } from 'helpers';
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
import { PASSWORD } from 'const';
import { useForm } from 'hooks';
import { createLinkSocialRequest } from 'api';
import { AppContext } from 'App';

interface Props {
  className?: string;
  email: string;
  social?: string;
  token?: string;
}

const signInFields = [PASSWORD];

const SignInForm = (props: Props) => {
  const { className, email, social = '', token } = props;
  const { t } = useTranslation();
  const [remember, setRemember] = useState(false);
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(signInFields);
  const { loading, setLoading } = useContext(AppContext);
  const [formError, setFormError] = useState('');
  const handleRememberChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setFormError('');

    const data = { remember, email, social: token, ...getFormSubmitData(event) };
    const { error, param, url } = await createLinkSocialRequest(social)(data);

    setLoading(false);

    if (!error) {
      window.location.href = url;
      return;
    }

    if (param && errors[param]) {
      handleErrorsChange(param, t(error));
    } else {
      setFormError(t(error));
    }
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <StyledFormError message={formError} />
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

const StyledInput = styled(Input)`
  width: 400px;
`;
