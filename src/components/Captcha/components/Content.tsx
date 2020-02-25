import React from 'react';
import { useTranslation } from 'react-i18next';
import { SubmitButton } from 'components';
import { ErrorText } from 'styles/primitives';
import { Description } from 'styles/common';

interface Props {
  className?: string;
  loading: boolean;
  error: Error | null;
}

const Content = (props: Props) => {
  const { error, loading } = props;
  const { t } = useTranslation();

  if (error) return <ErrorText>{error.message}</ErrorText>;

  return (
    <>
      <Description>{t('captcha-description')}.</Description>
      <SubmitButton loading={loading}>
        {t('verify')}
      </SubmitButton>
    </>
  );
};

const areEqual = (prev: Props, next: Props) => (
  prev.error === next.error &&
  prev.loading === next.loading
);

export default React.memo(Content, areEqual);
