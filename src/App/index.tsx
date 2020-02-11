import React, { Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
  Redirect,
}from 'react-router-dom';
import backgroundImage from 'assets/images/background.jpg';
import { Loader } from 'components';

const SignIn = React.lazy(() => import('pages/SignIn'));
const SignUp = React.lazy(() => import('pages/SignUp'));
const PasswordReset = React.lazy(() => import('pages/PasswordReset'));
const SignInSocialNew = React.lazy(() => import('pages/SignInSocialNew'));

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Wrapper>
        <Suspense fallback={<Loader color="white" size={14} />}>
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/social-new/:name" component={SignInSocialNew} />
            <Route path="/password-reset" component={PasswordReset} />
            <Redirect to="/sign-in" />
          </Switch>
        </Suspense>
      </Wrapper>
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
