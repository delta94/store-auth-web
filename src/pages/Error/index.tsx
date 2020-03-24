import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ComplainIcon } from 'assets/icons';
import { ErrorWrapper, Container, ErrorTitle, ErrorDescription, ErrorIconWrapper } from 'styles/common';
import { WEBVIEW_LOADING } from 'const';
import { windowAlias } from 'helpers';

interface Props {
  className?: string;
}

const Error = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  useEffect(() => {
    windowAlias.ipc?.send(WEBVIEW_LOADING, false);
  }, []);

  return (
    <ErrorWrapper className={className}>
      <Container>
        <ErrorIconWrapper>
          <ComplainIcon />
        </ErrorIconWrapper>
        <ErrorTitle>
          {t('error-page-title')}
        </ErrorTitle>
        <ErrorDescription>
          {t('error-page-description')}
        </ErrorDescription>
      </Container>
    </ErrorWrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(Error, areEqual);
