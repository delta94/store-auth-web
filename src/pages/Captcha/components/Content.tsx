import React from 'react';
import styled from 'styled-components';
import { ErrorText } from 'styles/primitives';
import { Loader } from 'components';
import { useTranslation } from 'react-i18next';

import { GreyText, StyledButton } from 'pages/styles/common';
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

const Description = styled(GreyText)`
  margin-top: 8px;
  padding: 0 16px;
  text-align: center;
`;

const StyledLoader = styled(Loader)`
  margin-bottom: 70px;
`;
