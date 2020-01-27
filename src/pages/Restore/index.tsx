import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'pages/shared';
import { Header } from 'components';

interface Props {
  className?: string;
}

const Restore = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Form className={className}>
      <Header title={t('reset-password')} />
    </Form>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(Restore, areEqual);
