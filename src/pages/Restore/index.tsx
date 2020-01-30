import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader } from 'components';

import { Form } from '../styles/common';

interface Props {
  className?: string;
}

const Restore = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Form className={className}>
      <FormHeader title={t('reset-password')} />
    </Form>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(Restore, areEqual);
