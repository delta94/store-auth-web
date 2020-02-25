import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { RememberPassword, SubmitButton } from 'components';
import { emailValidate } from 'helpers';
import { Form, StyledFormInput } from 'styles/common';
import { EMAIL } from 'const';
import { useForm } from 'hooks';

interface Props {
  className?: string;
  onSubmit?: (email: string) => void;
}

const resetFields = [EMAIL];

const PasswordResetForm = (props: Props) => {
  const { onSubmit, className } = props;
  const { t } = useTranslation();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);

  const handlePasswordReset = (event: FormEvent) => {
    event.preventDefault();

    const { email } = getFormSubmitData(event);

    if (onSubmit) onSubmit(email);
  };

  return (
    <Form className={className} onSubmit={handlePasswordReset}>
      <StyledFormInput
        type="text"
        label={t('email')}
        name="email"
        error={errors.email.value}
        validate={emailValidate}
        onValidate={handleErrorsChange}
      />
      <StyledResetButton disabled={!isFormValid}>
        {t('send-email')}
      </StyledResetButton>
      <RememberPassword />
    </Form>
  );
};

export default React.memo(PasswordResetForm);

const StyledResetButton = styled((props: any) => <SubmitButton {...props} />)`
  margin-top: 16px;
`;
