import React, { useState } from 'react';
import './form-styles.css';
//import firebase from 'firebase/compat/app';
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
    // Check email and password against registered credentials
    if(email === 'registered_email@example.com' && password === 'password123') {
      console.log('Login failed');
      // Perform additional actions upon successful login
    } else {
      console.log('Login successfull');
      // Display error message or perform other actions for failed login
    }
     // fire base in login
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User login successful
      const user = userCredential.user;
      console.log('User login successful:', user);
      // You can perform additional actions here, like redirecting the user to a dashboard page
    })
    .catch((error) => {
      // User login failed
      const errorMessage = error.message;
      console.error('User login failed:', errorMessage);
      // Display error message or perform other actions for failed login
    });
  };

  return (
    <form className="add "onSubmit={handleLogin}>
      <h2>Login</h2>
      <label className="box" htmlFor="email">Email:</label>
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
      <div className="reg">
        Don't have an account?{' '}
        <button type="button" className="log" onClick={handleSwitchForm}>
          Signup
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
