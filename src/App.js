import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  const [isRegistration, setIsRegistration] = useState(true);

  const handleSwitchForm = () => {
    setIsRegistration(!isRegistration);
  };

  return (
    <div className="App">
      {isRegistration ? (
        <RegistrationForm handleSwitchForm={handleSwitchForm} />
      ) : (
        <LoginForm handleSwitchForm={handleSwitchForm} />
      )}
    </div>
  );
};

export default App;
