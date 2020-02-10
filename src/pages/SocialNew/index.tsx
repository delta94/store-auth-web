import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FormHeader, Tabs, Tab, SignInForm, SignUpForm, Privacy } from 'components';
import { PLATFORM } from 'const';
import {
  FormWrapper,
  Description,
  GreyText,
  BlueLink,
} from 'styles/common';
import { useParams } from 'react-router-dom';

interface Props {
  className?: string;
}

const SocialNew = (props: Props) => {
  const { className } = props;
  const { name } = useParams();
  const { t } = useTranslation();
  
  return (
    <FormWrapper className={className}>
      <FormHeader title={`${t('social-new')} ${name}`} />
      <Description>
        {t('social-new-description', { name, platform: PLATFORM })}
      </Description>
      <StyledTabs>
        <StyledTab label={t('tab-new')}>
          <SignUpForm />
        </StyledTab>
        <StyledTab label={t('tab-existing')}>
          <SignInForm />
        </StyledTab>
      </StyledTabs>
      <GreyText>
        {`${t('dont-link')}? `}
        <BlueLink to="sign-up">
          {t('sign-up')}
        </BlueLink>!
      </GreyText>
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SocialNew);

const StyledTabs = styled(Tabs)`
  margin-top: 16px;
  color: white;
  transition: all .3s ease-in-out;
`;

const StyledTab = styled(Tab)`
  margin-top: 20px;
`;