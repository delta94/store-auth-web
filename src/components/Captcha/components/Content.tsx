import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Loader, SubmitButton } from 'components';
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

  if (loading) return <StyledLoader size={14} color="white" title="Loading..." />;

  return (
    <>
      <Description>{t('captcha-description')}.</Description>
      <SubmitButton>
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

const StyledLoader = styled(Loader)`
  margin-bottom: 70px;
`;
