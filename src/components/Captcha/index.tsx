import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader } from 'components';
import { Form } from 'styles/common';

import Content from './components/Content';

interface Props {
  token: string;
  action: string;
  loading: boolean;
  error: Error | null;
  className?: string;
  onFail: () => void;
  onSuccess: (token: string) => void;
}

const Captcha = (props: Props) => {
  const { className, onSuccess, onFail, token, loading, error } = props;
  const { t } = useTranslation();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // send token to backend
    // if backend say OK - call onSuccess, else onFail
    return Math.random() > 0.5 ? onSuccess(token) : onFail(); 
  };

  return (
    <>
      <FormHeader title={t('captcha')} />
      <Form className={className} onSubmit={handleSubmit}>
        <Content loading={loading} error={error} />
      </Form>
    </>
  );
};

export default React.memo(Captcha);
