import React, { useState, useEffect } from 'react';
import '../CSS/RegistrationForm.css';

const RegistrationForm = () => {
  console.log("in RegistrationForm")
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [address, setAddress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const user = {
    firstName: '',
    lastName: '',
    id: '',
    address: '',
    birthdate: '',
    phone: '',
    mobilePhone: '',
    profilePicture: null
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const Registrations = () => {
    const user = {
      firstName: firstName,
      lastName: lastName,
      id: id,
      address: address,
      birthdate: birthdate,
      phone: phone,
      mobilePhone: mobilePhone,
      profilePicture: profilePicture
    };
    
    console.log(user); 
    addPatientData(user)
  };

  const addPatientData = async (newPatientData) => {
    try {
        const response = await fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPatientData)
        });

        if (!response.ok) {
            throw new Error('Failed to add patient data');
        }
        console.log('Patient data added successfully!');
        alert("Patient data added successfully");        
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label htmlFor="birthdate">Birthdate:</label>
        <input type="date" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="mobilePhone">Mobile Phone:</label>
        <input type="tel" id="mobilePhone" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
      </div>
      <div>
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
      </div>
      <button type="submit" onClick={Registrations}>Submit</button>
    </form>
  );
};

export default RegistrationForm