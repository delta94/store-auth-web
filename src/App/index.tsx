import React, { Suspense } from 'react';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
  Redirect,
}from 'react-router-dom';

import { Wrapper, GlobalStyle } from './style';
import Loader from 'components/Loader';

const SignIn = React.lazy(() => import('pages/SignIn'));
const SignUp = React.lazy(() => import('pages/SignUp'));
const Restore = React.lazy(() => import('pages/Restore'));

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <Wrapper>
        <Suspense fallback={<Loader color="white" size={14} />}>
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/reset-password" component={Restore} />
            <Redirect to="/sign-in" />
          </Switch>
        </Suspense>
      </Wrapper>
      <GlobalStyle />
    </Router>
  );
};

export default App;
