import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'i18n';
import { createBrowserHistory } from 'history';
import {
  Router,
  Switch,
  Route,
}from 'react-router-dom';
import backgroundImage from 'assets/images/background.jpg';
import SignIn from 'pages/SignIn';

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
