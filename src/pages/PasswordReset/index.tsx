import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Captcha, PasswordResetForm, PasswordResetSuccess } from 'components';
import { FormWrapper, Description } from 'styles/common';

type Step = 'enter' | 'captcha' | 'success';

interface Props {
  className?: string;
}

const PasswordReset = (props: Props) => {
  const [step, setStep] = useState<Step>('enter');
  const { className } = props;
  const { t } = useTranslation();
  
  const handleCaptchaFail = () => {
    // show captcha error?
    alert('Captcha check Fail!');
  };

  const handleCaptchaSuccess = () => {
    // send email to backend
    setStep('success');
  };

  const showCaptcha = () => {
    setStep('captcha');
  };

  const getContent = () => {
    switch (step) {
      case 'captcha':
        return (
          <Captcha 
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
            <PasswordResetForm onSubmit={showCaptcha} />
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
