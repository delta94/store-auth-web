import React, { Suspense, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
  Redirect,
}from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import backgroundImage from 'assets/images/background.jpg';
import { Loader, FormError } from 'components';
import { getUrlWithSearch } from 'helpers';
import useSocialProviders, { defaultSocial } from 'hooks/useSocialProviders';
import { getChallenge } from 'api';

const SignIn = React.lazy(() => import('pages/SignIn'));
const SignUp = React.lazy(() => import('pages/SignUp'));
const PasswordReset = React.lazy(() => import('pages/PasswordReset'));
const PasswordResetSuccess = React.lazy(() => import('pages/PasswordResetSuccess'));
const NewPassword = React.lazy(() => import('pages/NewPassword'));
const SignInSocialNew = React.lazy(() => import('pages/SignInSocialNew'));
const SignInSocialExisting = React.lazy(() => import('pages/SignInSocialExisting'));
const ExpiredLink = React.lazy(() => import('pages/ExpiredLink'));
const Error = React.lazy(() => import('pages/Error'));

const history = createBrowserHistory();

export const SocialContext = React.createContext(defaultSocial);

const App: React.FC = () => {
  const social = useSocialProviders();
  const { t } = useTranslation();

  useEffect(() => {
    const challenge = getChallenge();

    if (!challenge) {
      window.location.href = process.env.REACT_APP_STORE_URL || '';
    }
  }, []);

  return (
    <Router history={history}>
      <SocialContext.Provider value={social}>
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
              <Redirect to={getUrlWithSearch('/sign-in')} />
            </Switch>
          </Suspense>
        </Wrapper>
      </SocialContext.Provider>
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage});
  background-size: cover;
  background-position: center;
`;

const OfflineMessage = styled((props: any) => <FormError {...props} />)<{ hide: boolean }>`
  opacity: ${({ hide }) => hide ? 0 : 1};
  position: absolute;
  top: 0;
`;
