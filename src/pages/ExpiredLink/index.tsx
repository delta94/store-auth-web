import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExpiredLinkIcon } from 'assets/icons';
import { ErrorWrapper, Container, ErrorTitle, ErrorDescription, ErrorIconWrapper } from 'styles/common';

interface Props {
  className?: string;
}

const ExpiredLink = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <ErrorWrapper className={className}>
      <Container>
        <ErrorIconWrapper>
          <ExpiredLinkIcon />
        </ErrorIconWrapper>
        <ErrorTitle>
          {t('expired-link-title')}
        </ErrorTitle>
        <ErrorDescription>
          {t('expired-link-description')}
        </ErrorDescription>
      </Container>
    </ErrorWrapper>
  );
};

const areEqual = (prev: Props, next: Props) => prev === next;

export default React.memo(ExpiredLink, areEqual);
