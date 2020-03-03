import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Privacy, DontWantLink, SocialExistingForm, Loader } from 'components';
import { PLATFORM, TOKEN } from 'const';
import {
  FormWrapper,
  Description,
} from 'styles/common';
import { useParams, useHistory } from 'react-router-dom';
import { capitalize, getUrlParameter } from 'helpers';
import { useSocialProfile } from 'hooks';

interface Props {
  className?: string;
}

const token = getUrlParameter(TOKEN);

const SignInSocialExisting = (props: Props) => {
  const { className } = props;
  const { name = '' } = useParams();
  const { loading, profile, error } = useSocialProfile(name, token);
  const capitalizedName = capitalize(name);
  const { t } = useTranslation();
  const history = useHistory();
  const { email } = profile;

  if (error) {
    history.replace('/error');
  }

  if (loading) return <Loader size={14} color="white" />;

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('social-existing')} />
      <StyledDescription>
        {t('social-existing-description', { name: capitalizedName, platform: PLATFORM, email })}
      </StyledDescription>
      <SocialExistingForm email={email} social={name} token={token} />
      <DontWantLink />
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignInSocialExisting);

const StyledDescription = styled(Description)`
  margin-bottom: 16px;
`;
