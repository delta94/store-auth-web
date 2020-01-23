import React from 'react';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
  Redirect,
}from 'react-router-dom';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';

import { Wrapper, GlobalStyle } from './style';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Wrapper>
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Redirect to="/sign-in" />
        </Switch>
      </Wrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
