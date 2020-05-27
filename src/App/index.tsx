import React, { Suspense, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader, FormError, Privacy } from 'components';
import { getUrlWithSearch } from 'helpers';
import { useSocialProviders } from 'hooks';
import { getChallenge } from 'api';
import { AppContextType } from 'types';
import { GRAY_900 } from 'styles/colors';

const SignIn = React.lazy(() => import('pages/SignIn'));
const SignUp = React.lazy(() => import('pages/SignUp'));
const PasswordReset = React.lazy(() => import('pages/PasswordReset'));
const PasswordResetSuccess = React.lazy(() => import('pages/PasswordResetSuccess'));
const NewPassword = React.lazy(() => import('pages/NewPassword'));
const SignInSocialNew = React.lazy(() => import('pages/SignInSocialNew'));
const SignInSocialExisting = React.lazy(() => import('pages/SignInSocialExisting'));
const ExpiredLink = React.lazy(() => import('pages/ExpiredLink'));
const Error = React.lazy(() => import('pages/Error'));
const AuthCallback = React.lazy(() => import('pages/AuthCallback'));
const SignInSocialInit = React.lazy(() => import('pages/SignInSocialInit'));
const SignInSocialConfirm = React.lazy(() => import('pages/SignInSocialConfirm'));

const history = createBrowserHistory();

export const AppContext = React.createContext<AppContextType>({
  providers: [],
  loading: false,
  // eslint-disable-next-line
  setLoading: (newLoading: boolean) => { },
});

const App: React.FC = () => {
  const providers = useSocialProviders();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const appContextValue = { providers, loading, setLoading };

  useEffect(() => {
    const challenge = getChallenge();
    const isErrorPage = window.location.pathname.startsWith('/error');
    const isAuthCallbackPage = window.location.pathname.startsWith('/auth-callback');
    const isSocialSignInPage = window.location.pathname.startsWith('/social-sign-in');
    const isUrlHasChallenge = !!challenge;
    const isUrlValid = isUrlHasChallenge || isErrorPage || isAuthCallbackPage || isSocialSignInPage;

    if (!isUrlValid) {
      window.location.href = process.env.REACT_APP_STORE_URL || '';
    }
  }, []);

  return (
    <Router history={history}>
      <AppContext.Provider value={appContextValue}>
        <Wrapper>
          <OfflineMessage message={t('offline')} hide={navigator.onLine} />
          <Suspense fallback={<Loader color="white" size={14} />}>
            <Switch>
              <Route path="/sign-in" component={SignIn} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/social-new/:name" component={SignInSocialNew} />
              <Route path="/social-existing/:name" component={SignInSocialExisting} />
              <Route path="/password-reset" component={PasswordReset} />
              <Route path="/password-reset-success" component={PasswordResetSuccess} />
              <Route path="/change-password" component={NewPassword} />
              <Route path="/expired-link" component={ExpiredLink} />
              <Route path="/error" component={Error} />
              <Route path="/auth-callback" component={AuthCallback} />
              <Route path="/social-sign-in-init/:name" component={SignInSocialInit} />
              <Route path="/social-sign-in-confirm" component={SignInSocialConfirm} />
              <Redirect to={getUrlWithSearch('/sign-in')} />
            </Switch>
          </Suspense>
          <StyledPrivacy />
        </Wrapper>
      </AppContext.Provider>
      <GlobalStyle />
    </Router>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  html, body {
    margin: 0;
	  padding: 0;
	  border: 0;
    min-height: 100%;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${GRAY_900};
  background-size: cover;
  background-position: center;
`;

const StyledPrivacy = styled(Privacy)`
  position: absolute;
  bottom: 24px;
  left: 24px;
`;

const OfflineMessage = styled((props: any) => <FormError {...props} />) <{ hide: boolean }>`
  opacity: ${({ hide }) => hide ? 0 : 1};
  position: absolute;
  top: 0;
`;
