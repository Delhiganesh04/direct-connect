import React, { useState } from 'react';
import { BrowserRouter as Router  } from 'react-router-dom';
import './form-styles.css';
import 'firebase/compat/auth';
import firebase from '../firebase'; // Update the path based on your file structure

const LoginForm = ({ handleSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Firebase login
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User login successful
        const user = userCredential.user;
        console.log('User login successful:', user);
        // Perform additional actions upon successful login
        if (email === user.email) {
          console.log('Login successful');
          // Redirect or perform additional actions for successful login
          window.location.href = 'https://www.tncengineers.com';
        } else {
          console.log('Login failed');
          // Handle invalid credentials or show an error message
        }
      })
      .catch((error) => {
        // User login failed
        const errorMessage = error.message;
        console.error('User login failed:', errorMessage);
        // Display error message or perform other actions for failed login
        console.log('Login failed');
      });
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Firebase password reset
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
        // Display a success message or perform additional actions here
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Password reset email could not be sent:', errorMessage);
        // Display error message or perform other actions for password reset failure
      });
  };

  return (
    <form className="add" onSubmit={handleLogin}>
      <h2>Login</h2>
      <label className="box" htmlFor="email">
        Email:
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <br />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <br />

      <button type="submit">Login</button>
      <button type="button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <div className="reg">
        Don't have an account?{' '}
        <button type="button" className="log" onClick={handleSwitchForm}>
          Signup
        </button>
      </div>
    </form>
  );
};

const LoginFormWithRouter = () => (
  <Router>
    <LoginForm handleSwitchForm={() => {}} />
  </Router>
);

export default LoginFormWithRouter;
