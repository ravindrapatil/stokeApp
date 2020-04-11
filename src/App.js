import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';
import './App.css';

import Home from './Home'

const config = {
  issuer: 'https://dev-944867.okta.com',
  redirectUri: window.location.origin + '/implicit/callback',
  clientId: '0oa4ucepji31EbhhF4x6',
  pkce: true
};

function App() {
  return (
    <div className="App">
      <Router>
        <Security {...config}>
          <Route path='/' exact={true} component={Home} />
          <Route path='/implicit/callback' component={LoginCallback} />
        </Security>
      </Router>
    </div>
  );
}

export default App;
