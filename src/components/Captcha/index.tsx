import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { FormHeader, Loader } from 'components';
import { Form, Description } from 'styles/common';
import ReCAPTCHA from 'react-google-recaptcha';
import { useCaptchaKey } from 'hooks';

interface Props {
  className?: string;
  onSubmit: (token: string | null) => void;
  captchaRef?: any;
}

const Captcha = (props: Props) => {
  const { className, onSubmit, captchaRef } = props;
  const { sitekey, loading } = useCaptchaKey();
  const { t } = useTranslation();

  return (
    <>
      <FormHeader title={t('captcha')} />
      <Form className={className}>
        <Description>{t('captcha-description')}.</Description>
        {loading || !sitekey
          ? <Loader color="white" size={14} />
          : (
            <CaptchaWrapper>
              <ReCAPTCHA sitekey={sitekey} onChange={onSubmit} ref={captchaRef} />
            </CaptchaWrapper>
          )
        }
      </Form>
    </>
  );
};

export default React.memo(Captcha);

const CaptchaWrapper = styled.div`
  margin: 24px 0 16px 0;
`;
