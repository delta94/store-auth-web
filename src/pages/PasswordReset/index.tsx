import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, PasswordResetForm, RememberPassword } from 'components';
import { FormWrapper, Description } from 'styles/common';

interface Props {
  className?: string;
}

const PasswordReset = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  const formHeader = (
    <>
      <FormHeader title={t('password-reset')} />
      <StyledDescription>
        {t('password-reset-description')}
      </StyledDescription>
    </>
  );

  const formFooter =  <RememberPassword />;

  return (
    <FormWrapper className={className}>
      <PasswordResetForm
        header={formHeader}
        footer={formFooter}
      />
    </FormWrapper>
  );
};

export default React.memo(PasswordReset);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
