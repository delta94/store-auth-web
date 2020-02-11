import React, { useState, FormEvent } from 'react';
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

type Step = 'enter' | 'captcha' | 'success';

interface Props {
  className?: string;
  onSubmit?: () => void;
}

const PasswordResetForm = (props: Props) => {
  const { onSubmit, className } = props;
  const { t } = useTranslation();
  const [errors, setErrors] = useState({
    email: {
      value: '',
      touched: false,
    },
  });

  const handleErrorsChange = (field: string, value: string) => {
    setErrors({
      ...errors,
      [field]: {
        value,
        touched: true,
      },
    });
  };

  const isFormValid = Object.values(errors).every(({ value, touched }) => !value && touched);

  const handlePasswordReset = (event: FormEvent) => {
    event.preventDefault();

    const form: any = event.target;
    const email = form.email.value;

    console.log({ email });
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
