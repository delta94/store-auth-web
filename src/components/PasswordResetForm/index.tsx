import React, { FormEvent, ReactNode, useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {  SubmitButton, Captcha } from 'components';
import { emailValidate, getUrlWithSearch, checkCaptchaRequired } from 'helpers';
import { Form, StyledFormInput, HideableWrapper, StyledFormError } from 'styles/common';
import { EMAIL, captchaAction } from 'const';
import { useForm } from 'hooks';
import { passwordResetRequest } from 'api';
import { useHistory } from 'react-router-dom';
import { AppContext } from 'App';

interface Props {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

const resetFields = [EMAIL];

const PasswordResetForm = (props: Props) => {
  const { header, footer, className } = props;
  const { t } = useTranslation();
  const { loading, setLoading } = useContext(AppContext);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const history = useHistory();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);
  const captchaRef = useRef(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setFormData(getFormSubmitData(event));
    setShowCaptcha(true);
  };

  const handleCaptchaSuccess = async (captchaToken: string | null) => {
    setLoading(true);
    setFormError('');

    const data: Record<string, any> = { captchaAction, captchaToken, ...formData };

    const { error, param } = await passwordResetRequest(data);

    if (!error) {
      history.push(getUrlWithSearch('/password-reset-success'));
    }

    if (checkCaptchaRequired(error)) {
      setLoading(false);
      const ref: any = captchaRef.current;
      if (ref && ref.reset) ref.reset();
      return;
    }

    if (param && errors[param]) {
      handleErrorsChange(param, t(error));
    } else {
      setFormError(t(error));
    }

    setLoading(false);
    setShowCaptcha(false);
  };

  return (
    <>
      <HideableWrapper hide={!showCaptcha}>
        <Captcha 
          onSubmit={handleCaptchaSuccess}
          captchaRef={captchaRef}
        />
      </HideableWrapper>
      <HideableWrapper hide={showCaptcha}>
        {header}
        <Form className={className} onSubmit={handleSubmit}>
          <StyledFormError message={formError} />
          <StyledFormInput
            type="text"
            label={t('email')}
            name="email"
            error={errors.email.value}
            validate={emailValidate}
            onValidate={handleErrorsChange}
          />
          <StyledResetButton disabled={!isFormValid} loading={loading}>
            {t('send-email')}
          </StyledResetButton>
        </Form>
        {footer}
      </HideableWrapper>
    </>
  );
};

export default React.memo(PasswordResetForm);

const StyledResetButton = styled((props: any) => <SubmitButton {...props} />)`
  margin-top: 16px;
`;
