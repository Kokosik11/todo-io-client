import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Welcome from './Welcome';
import { UserProvider } from "./context/UserProvider"

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Welcome />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
