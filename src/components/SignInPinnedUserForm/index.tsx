import React, { FormEvent, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
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
import { signInRequest } from 'api';
import { SubmitButton } from 'components';
import PinnedUser from 'components/PinnedUser';
import styled from 'styled-components';
import { User } from 'types';
import { AppContext } from 'App';

interface Props {
  className?: string;
  onChangeAccount: () => void;
  user: User;
}

const signInFields = [PASSWORD];

const SignInPinnedUserForm = (props: Props) => {
  const { className, user, onChangeAccount } = props;
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
    
    const { email } = user; 
    const formData = { remember, email, ...getFormSubmitData(event) };

    const { error, param, url } = await signInRequest(formData);

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
      <StyledPinnedUser 
        user={user}
        onChangeAccount={onChangeAccount}
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

export default React.memo(SignInPinnedUserForm);

const StyledPinnedUser = styled((props: any) => <PinnedUser {...props} />)`
  width: 100%;
  margin: 8px 0 12px 0;
`;
