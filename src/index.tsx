import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import theme from './themes';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Home from './core/home';
import Explore from './core/explore';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider theme={theme}>
        <Layout>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/explore">
            <Explore />
          </Route>
        </Layout>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
