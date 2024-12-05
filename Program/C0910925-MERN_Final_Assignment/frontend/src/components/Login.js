//Student Name: Kisan Rai 
//Student Number: C0910925

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Pane, Heading, Alert } from 'evergreen-ui';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy check: If email and password match dummy values
    if (email === 'test@estexample.com' && password === 'password123') {
      navigate('/viewUser');  // Redirect to the user list page
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <div className="login-page">
      {/* Flexbox container for centering the login */}
      <Pane className="login-container">
        <Pane className="form-container">
          <Heading size={600} className="login-heading">Login</Heading>

          {/* Show error message if exists */}
          {errorMessage && <Alert intent="danger" title={errorMessage} className="error-alert" />}

          <form onSubmit={handleLogin} className="login-form">
            <Pane className="input-container">
              <TextInput
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </Pane>

            <Pane className="input-container">
              <TextInput
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </Pane>

            <Button
              type="submit"
              appearance="primary"
              intent="success"
              className="login-button"
            >
              Login
            </Button>
          </form>
        </Pane>
      </Pane>
    </div>
  );
};

export default Login;
