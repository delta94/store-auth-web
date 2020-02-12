import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormWrapper, Description } from 'styles/common';
import { FormHeader, NewPasswordForm } from 'components';
import { PLATFORM } from 'const';

interface Props {
  className?: string;
}

const mockEmail = 'john@example.com';

const NewPassword = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('new-password')} />
      <StyledDescription>
        {t('new-password-description', { platform: PLATFORM, email: mockEmail })}
      </StyledDescription>
      <NewPasswordForm />
    </FormWrapper>
  );
};

export default React.memo(NewPassword);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
