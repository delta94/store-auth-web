import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Captcha, PasswordResetForm, PasswordResetSuccess } from 'components';
import { FormWrapper, Description } from 'styles/common';
import useCaptcha from 'hooks/useCaptcha';

type Step = 'enter' | 'captcha' | 'success';

interface Props {
  className?: string;
}

const PasswordReset = (props: Props) => {
  const [step, setStep] = useState<Step>('enter');
  const [email, setEmail] = useState('');
  const captcha = useCaptcha();
  const { className } = props;
  const { t } = useTranslation();

  const handleCaptchaFail = () => {
    // show captcha error?
    alert('Captcha check Fail!');
  };

  const handleCaptchaSuccess = (token: string) => {
    // send email and token to backend
    console.log({ email, token });
    setStep('success');
  };

  const handleEmailSubmit = (submitedEmail: string) => {
    setEmail(submitedEmail);
    setStep('captcha');
  };

  const getContent = () => {
    switch (step) {
      case 'captcha':
        return (
          <Captcha
            {...captcha}
            onFail={handleCaptchaFail}
            onSuccess={handleCaptchaSuccess}
          />
        );

      case 'success':
        return (
          <PasswordResetSuccess />
        );

      case 'enter':
      default:
        return (
          <>
            <FormHeader title={t('password-reset')} />
            <StyledDescription>
              {t('password-reset-description')}
            </StyledDescription>
            <PasswordResetForm onSubmit={handleEmailSubmit} />
          </>
        );
    }
  };

  return (
    <FormWrapper className={className}>
      {getContent()}
    </FormWrapper>
  );
};

export default React.memo(PasswordReset);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
