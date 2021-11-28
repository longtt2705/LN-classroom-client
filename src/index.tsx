import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router
} from "react-router-dom";
import App from './app';
import store from './app/store';
import { DataItem, MaterialTable } from './core/grade-structure';
import theme from './themes';

const tableData: Array<DataItem> = [
  { uuid: "1", description: "Item #1", unitPrice: 11.11, quantity: 1 },
  { uuid: "2", description: "Item #2", unitPrice: 22.22, quantity: 2 },
  { uuid: "3", description: "Item #3", unitPrice: 33.33, quantity: 3 },
  { uuid: "4", description: "Item #4", unitPrice: 44.44, quantity: 4 },
  { uuid: "5", description: "Item #5", unitPrice: 55.55, quantity: 5 }
];
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
          <MaterialTable items={tableData} />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
