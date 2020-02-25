import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader } from 'components';
import { Form } from 'styles/common';

import Content from './components/Content';

interface Props {
  loading: boolean;
  error: Error | null;
  className?: string;
  onSubmit: (event: FormEvent) => void;
}

const Captcha = (props: Props) => {
  const { className, onSubmit, loading, error } = props;
  const { t } = useTranslation();

  return (
    <>
      <FormHeader title={t('captcha')} />
      <Form className={className} onSubmit={onSubmit}>
        <Content loading={loading} error={error} />
      </Form>
    </>
  );
};

export default React.memo(Captcha);
