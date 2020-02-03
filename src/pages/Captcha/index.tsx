import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader } from 'components';
import useCaptcha from 'hooks/useCaptcha';

import { Form } from '../styles/common';
import Content from './components/Content';

const CAPTCHA_KEY = process.env.REACT_APP_CAPTCHA_KEY || '';

interface Props {
  className?: string;
  onFail: () => void;
  onSuccess: () => void;
}

const Captcha = (props: Props) => {
  const { className, onSuccess, onFail } = props;
  const { t } = useTranslation();
  const { token, loading, error } = useCaptcha(CAPTCHA_KEY);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // send token to backend
    console.log(token);
    // if backend say OK - call onSuccess, else onFail
    return Math.random() > 0.5 ? onSuccess() : onFail(); 
  };

  return (
    <Form className={className} onSubmit={handleSubmit}>
      <FormHeader title={t('captcha')} />
      <Content loading={loading} error={error} />
    </Form>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(Captcha, areEqual);
