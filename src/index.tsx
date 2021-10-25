import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './layout/app-bar';
import SideBar from './layout/side-bar';

ReactDOM.render(
  <React.StrictMode>
    <AppBar />
    <SideBar/>
  </React.StrictMode>,
  document.getElementById('root'),
);
