import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Helmet} from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Helmet>
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </Helmet>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
