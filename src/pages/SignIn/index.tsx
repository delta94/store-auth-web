import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FormHeader, SignInForm, Privacy, Loader } from 'components';
import {
  GreyText,
  StyledSocialButtons,
  FormWrapper,
  BlueLink,
  AuthSkip,
} from 'styles/common';
import { PLATFORM, WEBVIEW_LOADING, AUTH_GUEST } from 'const';
import { getUrlWithSearch, isLauncher, windowAlias } from 'helpers';
import SignInPinnedUserForm from 'components/SignInPinnedUserForm';
import { User } from 'types';
import { usePreviosUser } from 'hooks';

interface Props {
  className?: string;
}

const SignIn = (props: Props) => {
  const { className } = props;
  const { t } = useTranslation();
  const { loading, previosUser } = usePreviosUser();
  const [pinnedUser, setPinnedUser] = useState<User | null>(null);

  useEffect(() => {
    windowAlias.ipc?.send(WEBVIEW_LOADING, false);
  }, []);

  useEffect(() => {
    setPinnedUser(previosUser);
  }, [loading]);

  const handleSkipAuth = () => {
    windowAlias.ipc?.send(AUTH_GUEST);
  };

  const handleUnsetPinnedUser = () => {
    setPinnedUser(null);
  };

  if (loading) return <Loader color="white" size={14} />;

  return (
    <FormWrapper className={className}>
      <FormHeader title={t('sign-in')} />
      <StyledSocialButtons />
      {pinnedUser && pinnedUser.email
        ? <SignInPinnedUserForm user={pinnedUser} onChangeAccount={handleUnsetPinnedUser} />
        : <SignInForm user={previosUser} />
      }
      <GreyText>
        {`${t('dont-have-account', { platform: PLATFORM })}? `}
        <BlueLink to={getUrlWithSearch('/sign-up')}>
          {t('sign-up')}
        </BlueLink>
        {isLauncher && (
          <>
            {` ${t('or')} `}
            <AuthSkip onClick={handleSkipAuth}>{t('sign-in-later')}</AuthSkip>
          </>
        )}
      </GreyText>
      <Privacy />
    </FormWrapper>
  );
};

export default React.memo(SignIn);
