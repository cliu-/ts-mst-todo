import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import * as serviceWorker from './serviceWorkerRegistration';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { rootStore } from './store';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Router>
        <App appStore={rootStore} />
      </Router>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
