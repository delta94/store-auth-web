import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { passwordValidate } from 'helpers';
import { RememberPassword, SubmitButton } from 'components';
import { Form, StyledFormInput } from 'styles/common';
import { PASSWORD } from 'const';
import { useForm } from 'hooks';

interface Props {
  className?: string;
}

const resetFields = [PASSWORD];

const NewPasswordForm = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);

  const handlePasswordReset = (event: FormEvent) => {
    event.preventDefault();

    const formData = getFormSubmitData(event);

    console.log(formData);
  };

  return (
    <Form className={className} onSubmit={handlePasswordReset}>
      <StyledFormInput
        type="password"
        label={t('new-password')}
        name={PASSWORD}
        error={errors[PASSWORD].value}
        validate={passwordValidate}
        onValidate={handleErrorsChange}
      />
      <StyledSubmitButton disabled={!isFormValid}>
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
