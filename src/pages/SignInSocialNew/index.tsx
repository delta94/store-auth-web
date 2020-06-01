import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Tabs, Tab, SignInForm, SignUpForm, DontWantLink, Privacy } from 'components';
import { PLATFORM, TOKEN, WEBVIEW_LOADING } from 'const';
import { FormWrapper, Description } from 'styles/common';
import { useParams } from 'react-router-dom';
import { capitalize, getUrlParameter, windowAlias, isLauncher } from 'helpers';

interface Props {
  className?: string;
}

const token = getUrlParameter(TOKEN);

const SignInSocialNew = (props: Props) => {
  const { className } = props;
  const { name = '' } = useParams();
  const capitalizedName = capitalize(name);
  const { t } = useTranslation();

  useEffect(() => {
    windowAlias.ipc?.send(WEBVIEW_LOADING, false);
  }, []);

  return (
    <FormWrapper className={className}>
      <FormHeader title={`${t('social-new')} ${capitalizedName}`} />
      <Description>
        {t('social-new-description', { name: capitalizedName, platform: PLATFORM })}
      </Description>
      <StyledTabs>
        <StyledTab label={t('tab-new')}>
          <SignUpForm social={name} token={token} />
        </StyledTab>
        <StyledTab label={t('tab-existing')}>
          <SignInForm social={name} token={token} />
        </StyledTab>
      </StyledTabs>
      <DontWantLink />
      {!isLauncher && <Privacy />}
    </FormWrapper>
  );
};

export default React.memo(SignInSocialNew);

const StyledTabs = styled(Tabs)`
  margin-top: 16px;
  color: white;
  transition: all .3s ease-in-out;
`;

const StyledTab = styled(Tab)`
  margin-top: 20px;
`;
