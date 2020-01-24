import React from 'react';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
}from 'react-router-dom';
import SignIn from 'pages/SignIn';

import { Wrapper, GlobalStyle } from './style';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Wrapper>
        <Switch>
          <Route component={SignIn} />
        </Switch>
      </Wrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
