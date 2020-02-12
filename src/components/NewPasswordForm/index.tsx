import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { passwordValidate } from 'helpers';
import { RememberPassword } from 'components';
import { 
  Form,
  StyledFormInput,
  StyledButton,
} from 'styles/common';
import { PASSWORD } from 'const';
import useForm from 'hooks/useForm';

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
      <StyledResetButton disabled={!isFormValid} type="submit">
        {t('set-password')}
      </StyledResetButton>
      <RememberPassword />
    </Form>
  );
};

export default React.memo(NewPasswordForm);

const StyledResetButton = styled(StyledButton)`
  margin-top: 16px;
`;
