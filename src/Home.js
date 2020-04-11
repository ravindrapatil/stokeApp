import React from 'react'
import { useOktaAuth } from '@okta/okta-react';
import Dashboard from './componants/Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';

function Home() {
    const { authState, authService } = useOktaAuth();

    const login = async () => {
        // Redirect to '/' after login
        authService.login('/');
    }

    return authState.isAuthenticated ? 
        <Router><Dashboard /></Router> : <button onClick={login}>Login</button>
}

export default Home
