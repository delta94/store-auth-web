import React, { FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { emailValidate } from 'helpers';
import { 
  Form,
  StyledFormInput,
  StyledButton,
  GreyText,
  BlueLink,
} from 'styles/common';
import { EMAIL } from 'const';
import useForm from 'hooks/useForm';

type Step = 'enter' | 'captcha' | 'success';

interface Props {
  className?: string;
  onSubmit?: () => void;
}

const resetFields = [EMAIL];

const PasswordResetForm = (props: Props) => {
  const { onSubmit, className } = props;
  const { t } = useTranslation();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);

  const handlePasswordReset = (event: FormEvent) => {
    event.preventDefault();

    const formData = getFormSubmitData(event);

    console.log(formData);

    if (onSubmit) onSubmit();
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
      <StyledResetButton disabled={!isFormValid} type="submit">
        {t('send-email')}
      </StyledResetButton>
      <GreyText>
        {`${t('remember-password')}? `}
        <BlueLink to="sign-in">
          {t('sign-in')}
        </BlueLink>
      </GreyText>
    </Form>
  );
};

export default React.memo(PasswordResetForm);

const StyledResetButton = styled(StyledButton)`
  margin-top: 16px;
`;
