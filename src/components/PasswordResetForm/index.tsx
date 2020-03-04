import React, { FormEvent, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {  SubmitButton, Captcha } from 'components';
import { emailValidate, getUrlWithSearch } from 'helpers';
import { Form, StyledFormInput, HideableWrapper, StyledFormError } from 'styles/common';
import { EMAIL } from 'const';
import { useForm, useCaptcha } from 'hooks';
import { passwordResetRequest } from 'api';
import { useHistory } from 'react-router-dom';

interface Props {
  className?: string;
  header?: ReactNode;
  footer?: ReactNode;
}

const resetFields = [EMAIL];

const PasswordResetForm = (props: Props) => {
  const { header, footer, className } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showCaptcha, setShowCaptcha] = useState(false);
  const captcha = useCaptcha();
  const history = useHistory();
  const { errors, handleErrorsChange, isFormValid, getFormSubmitData } = useForm(resetFields);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!showCaptcha) {
      setFormData(getFormSubmitData(event));
      setShowCaptcha(true);
      return;
    }

    const { captchaAction, getToken } = captcha;

    setLoading(true);
    setFormError('');

    const captchaToken = await getToken();
    const data: Record<string, any> = { captchaAction, captchaToken, ...formData };

    const { error, param } = await passwordResetRequest(data);

    if (!error) {
      history.push(getUrlWithSearch('/password-reset-success'));
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
          error={captcha.error}
          loading={loading || captcha.loading}
          onSubmit={handleSubmit}
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
          <StyledResetButton disabled={!isFormValid}>
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
