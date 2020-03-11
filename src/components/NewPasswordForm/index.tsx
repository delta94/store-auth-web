import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { passwordValidate, getUrlWithSearch } from 'helpers';
import { RememberPassword, SubmitButton } from 'components';
import { Form, StyledFormInput } from 'styles/common';
import { PASSWORD } from 'const';
import { useForm } from 'hooks';
import { setPasswordRequest } from 'api';
import { useHistory } from 'react-router-dom';

interface Props {
  className?: string;
  token: string;
}

const resetFields = [PASSWORD];

const NewPasswordForm = (props: Props) => {
  const { className, token } = props;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { t } = useTranslation();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);

  const handleSetPassword = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const data = { token, ...getFormSubmitData(event) };
    const { error } = await setPasswordRequest(data);

    setLoading(false);

    if (!error) {
      history.push(getUrlWithSearch('/sign-in'));
      return;
    }

    history.replace(getUrlWithSearch('/expired-link'));
  };

  return (
    <Form className={className} onSubmit={handleSetPassword}>
      <StyledFormInput
        type="password"
        label={t('new-password')}
        name={PASSWORD}
        error={errors[PASSWORD].value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
      />
      <StyledSubmitButton disabled={!isFormValid} loading={loading}>
        {t('set-password')}
      </StyledSubmitButton>
      <RememberPassword />
    </Form>
  );
};

export default React.memo(NewPasswordForm);

const StyledSubmitButton = styled((props: any) => <SubmitButton {...props} />)`
  margin-top: 16px;
`;
