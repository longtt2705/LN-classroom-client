import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout';
import theme from './themes';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import ListRouter from "./app/routes"
import { Provider } from 'react-redux';
import store from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            {ListRouter.map((route, index) => (
              <Route
                key={index}
                exact={route.exactPath}
                path={route.path}
                render={() => (
                  <route.component name={route.name} />
                )}
              />
            ))}
          </Layout>
        </ThemeProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
