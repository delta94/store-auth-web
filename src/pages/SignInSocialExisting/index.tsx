import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Privacy, DontWantLink, SocialExistingForm } from 'components';
import { PLATFORM } from 'const';
import {
  FormWrapper,
  Description,
} from 'styles/common';
import { useParams } from 'react-router-dom';

interface Props {
  className?: string;
}

const mockEmail = 'john@example.com';

const SignInSocialExisting = (props: Props) => {
  const { className } = props;
  const { name } = useParams();
  const { t } = useTranslation();
  
  return (
    <FormWrapper className={className}>
      <FormHeader title={t('social-existing')} />
      <StyledDescription>
        {t('social-existing-description', { name, platform: PLATFORM, email: mockEmail })}
      </StyledDescription>
      <SocialExistingForm email={mockEmail} />
      <DontWantLink />
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignInSocialExisting);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
