import React, { useState, FormEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader } from 'components';
import Captcha from 'pages/Captcha';
import { emailValidate } from 'helpers';
import { EmailSentIcon } from 'assets/icons';

import { Form, StyledFormInput, StyledButton, GreyText, BlueLink, Description } from '../styles/common';
import { Link, RouteComponentProps } from 'react-router-dom';

type Step = 'enter' | 'captcha' | 'success';

interface Props extends RouteComponentProps {
  className?: string;
}

const PasswordReset = (props: Props) => {
  const [step, setStep] = useState<Step>('enter');
  const { className, history } = props;
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
    setStep('captcha');
  };

  const handleCaptchaFail = () => {
    setStep('enter');
    alert('Captcha Fail');
  };

  const handleCaptchaSuccess = () => {
    // send email to backend
    setStep('success');
  };

  const goToSignIn = (event: FormEvent) => {
    event.preventDefault();
    
    history.push('/sign-in');
  };

  switch (step) {
    case 'enter':
      return (
        <Form className={className} onSubmit={handlePasswordReset}>
          <FormHeader title={t('password-reset')} />
          <StyledFormInput
            type="text"
            label={t('email')}
            name="email"
            error={errors.email.value}
            validate={emailValidate}
            onValidate={handleErrorsChange}
          />
          <StyledResetButton disabled={!isFormValid} type="submit">
            {t('sign-in')}
          </StyledResetButton>
          <GreyText>
            {`${t('remember-password')}? `}
            <BlueLink to="sign-in">
              {t('sign-in')}
            </BlueLink>
          </GreyText>
        </Form>
      );

    case 'captcha':
      return (
        <Captcha 
          onFail={handleCaptchaFail}
          onSuccess={handleCaptchaSuccess}
        />
      );
  }

  return (
    <Form className={className} onSubmit={goToSignIn}>
      <StyledEmailSentIcon />
      <Title>{t('email-sent-title')}</Title>
      <Description>{t('email-sent-text-start')}{' '}
      <WhiteLink to="/sign-in">{t('contact-us')}</WhiteLink>
      {' '}{t('email-sent-text-end')}.</Description>
      <StyledButton type="submit">
        {t('ok')}
      </StyledButton>
    </Form>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(PasswordReset, areEqual);

const StyledResetButton = styled(StyledButton)`
  margin-top: 16px;
`;

const StyledEmailSentIcon = styled(EmailSentIcon)`
  margin-top: 16px;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  text-align: center;
  color: white;
`;

const WhiteLink = styled(Link)`
  color: white;
`;
