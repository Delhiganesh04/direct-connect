import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Select from 'react-select';
import './form-styles.css';
import './RegistrationForm.css';

const countryCodes = [
  { value: '+1', label: '+1 (United States)' },
  { value: '+44', label: '+44 (United Kingdom)' },
  { value: '+91', label: '+91 (India)' },
  { value: '+86', label: '+86 (China)' },
  { value: '+81', label: '+81 (Japan)' },
  { value: '+82', label: '+82 (South Korea)' },
  { value: '+49', label: '+49 (Germany)' },
  { value: '+33', label: '+33 (France)' },
  { value: '+39', label: '+39 (Italy)' },
  { value: '+7', label: '+7 (Russia)' },
  // Add more country codes as needed
];

const RegistrationForm = ({ handleSwitchForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [organization, setOrganization] = useState('');
  const [designation, setDesignation] = useState('');
  const [linkedinId, setLinkedinId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [otp, setOtp] = useState('');
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handleCountryCodeChange = (selectedOption) => {
    setCountryCode(selectedOption);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

    try {
      if (countryCode && phoneNumber) {
        const fullPhoneNumber = `${countryCode.value}${phoneNumber}`;
        const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await phoneProvider.verifyPhoneNumber(fullPhoneNumber, recaptchaVerifier);
        setVerificationId(verificationId);

      console.log("OTP sent to respective email");
      } else {
        console.error("the user didn't select a country code or didn't enter a phone number");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('OTP verification failed:', errorCode, errorMessage);
    }
  };

  const handleOTPVerification = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
      await firebase.auth().signInWithCredential(credential);
      console.log('OTP verification successful');

      // Create user with email and password
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User registration successful:', user);

      // Store user registration data in Firestore
      const db = getFirestore();
      const usersCollection = collection(db, 'directconnect');

      await addDoc(usersCollection, {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        age: age,
        gender: gender,
        educationalqualification: qualification,
        organization: organization,
        designation: designation,
        linkedinID: linkedinId,
      });

      console.log('User registration data stored in Firestore');
      setRegistrationStatus('success');
      // You can perform additional actions here if needed
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('User registration failed:', errorCode, errorMessage);
      setRegistrationStatus('failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registration</h2>
      <div className="boxes">
      <label htmlFor="name">Name:<span className="required">*</span></label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="email">Email:<span className="required">*</span></label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Enter your email"
        required
      />
      </div>
      <br />
      <div className="ph">Phone Number:<span className="required">*</span></div>
      <div className="country-code-phone-container">
        <div className="country-code-container">
          <label htmlFor="countryCode"></label>
          <Select
            options={countryCodes}
            value={countryCode}
            onChange={handleCountryCodeChange}
            placeholder="+91"
            isSearchable={false}
            required
          />
        </div>
        <div className="phone-number-container">
          <label htmlFor="phoneNumber"></label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Phone Number"
            required
          />
        </div>
      </div>

      <br />
      <div className="boxes">
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        value={age}
        onChange={handleAgeChange}
        placeholder="Enter your age"
        required
      />
      </div>
      <br />
      <div className="gen">
      <label htmlFor="gender">Gender:<span className="required">*</span></label>
      <select id="gender" value={gender} onChange={handleGenderChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      </div>
      <br />

      <div className="boxes">
      <label htmlFor="qualification">Education Qualification:<span className="required">*</span></label>
      <input
        type="text"
        id="qualification"
        value={qualification}
        onChange={handleQualificationChange}
        placeholder="Enter your qualification"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="organization">Organization:</label>
      <input
        type="text"
        id="organization"
        value={organization}
        onChange={handleOrganizationChange}
        placeholder="Enter your organization"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="designation">Designation:</label>
      <input
        type="text"
        id="designation"
        value={designation}
        onChange={handleDesignationChange}
        placeholder="Enter your desiganation"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="linkedinId">LinkedIn ID:<span className="required">*</span></label>
      <input
        type="text"
        id="linkedinId"
        value={linkedinId}
        onChange={handleLinkedinIdChange}
        placeholder="Enter your linkedinId"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="password">Password:<span className="required">*</span></label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="password"
        required
      />
      </div>
      <br />
      <div className="boxes">
      <label htmlFor="confirmPassword">Confirm Password:<span className="required">*</span></label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        placeholder="confirm password"
        required
      />
      </div>
      <br />

      <div id="recaptcha-container"></div>
      {verificationId ? (
        <>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <br />
          <button type="button" onClick={handleOTPVerification}>
            Verify OTP
          </button>
        </>
      ) : (
        <button type="submit">Register</button>
      )}

      {registrationStatus === 'success' && <p>Registration is successful!</p>}
      {registrationStatus === 'failed' && <p>Registration failed. Please try again.</p>}

      <div className="reg">
        Already have an account?{' '}
        <button type="button" className="log" onClick={handleSwitchForm}>
          Login
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;

