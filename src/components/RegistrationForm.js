import React, { useState } from 'react';
import './form-styles.css';
//import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebase from '../firebase'; // Update the path based on your file structure



const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [linkedinId, setLinkedinId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleQualificationChange = (e) => {
    setQualification(e.target.value);
  };

  const handleOrganizationChange = (e) => {
    setOrganization(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleLinkedinIdChange = (e) => {
    setLinkedinId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Age:', age);
    console.log('Gender:', gender);
    console.log('Education Qualification:', qualification);
    console.log('Organization:', organization);
    console.log('Designation:', designation);
    console.log('LinkedIn ID:', linkedinId);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
     // fire base in regist
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User registration successful
      const user = userCredential.user;
      console.log('User registration successful:', user);
      // You can perform additional actions here, like storing additional user data in Firebase Firestore
    })
    .catch((error) => {
      // User registration failed
      const errorMessage = error.message;
      console.error('User registration failed:', errorMessage);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        required
      />
      <br />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <br />

      <label htmlFor="phoneNumber">Phone Number:</label>
      <input
        type="tel"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        required
      />
      <br />

      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        value={age}
        onChange={handleAgeChange}
        required
      />
      <br />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" value={gender} onChange={handleGenderChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />

      <label htmlFor="qualification">Education Qualification:</label>
      <input
        type="text"
        id="qualification"
        value={qualification}
        onChange={handleQualificationChange}
        required
      />
      <br />

      <label htmlFor="organization">Organization:</label>
      <input
        type="text"
        id="organization"
        value={organization}
        onChange={handleOrganizationChange}
        required
      />
      <br />

      <label htmlFor="designation">Designation:</label>
      <input
        type="text"
        id="designation"
        value={designation}
        onChange={handleDesignationChange}
        required
      />
      <br />

      <label htmlFor="linkedinId">LinkedIn ID:</label>
      <input
        type="text"
        id="linkedinId"
        value={linkedinId}
        onChange={handleLinkedinIdChange}
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

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        required
      />
      <br />

      <button type="submit">Register</button>
    </form>
  );
  
};


export default RegistrationForm;
