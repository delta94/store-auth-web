import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ErrorText } from 'styles/primitives';
import { Loader } from 'components';
import { StyledButton, Description } from 'pages/styles/common';

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
      <StyledButton type="submit">
        {t('verify')}
      </StyledButton>
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
