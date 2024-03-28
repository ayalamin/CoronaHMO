// import React, { useState, useEffect } from 'react';
// import '../CSS/RegistrationForm.css';
// import { useNavigate } from "react-router-dom";


// const RegistrationForm = () => {
//   let navigate = useNavigate();

//   console.log("in RegistrationForm")
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [id, setId] = useState('');
//   const [buildingNumber, setbuildingNumber] = useState('');
//   const [citi, setCiti] = useState('');
//   const [street, setStreet] = useState('');
//   const [birthdate, setBirthdate] = useState('');
//   const [phone, setPhone] = useState('');
//   const [mobilePhone, setMobilePhone] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);


//   const handleSubmit = (event) => {
//     event.preventDefault();
//     debugger
//     const user = {
//       FirstName: firstName,
//       LastName: lastName,
//       MemberID: id,
//       Citi: citi,
//       Street: street,
//       BuildingNumber: buildingNumber,
//       BirthDate: birthdate,
//       Phone: phone,
//       MobilePhone: mobilePhone,
//       ProfilePicture: profilePicture
//     };
//     console.log(user);
//     addPatientData(user)
//   };

//   const user = {
//     firstName: '',
//     lastName: '',
//     id: '',
//     address: '',
//     birthdate: '',
//     phone: '',
//     mobilePhone: '',
//     profilePicture: null
//   };



//   const addPatientData = async (newPatientData) => {
//     try {
//       debugger
//       console.log("the date is: " + newPatientData.Birthdate);
//       const response = await fetch('http://localhost:8080/api/user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newPatientData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to add patient data');
//       }
//       console.log('Patient data added successfully!');
//       alert("Patient data added successfully");
//     } catch (error) {
//       console.error('Error:', error);
//     }
//     navigate(`/ViewMembers`);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="firstName">First Name:</label>
//         <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="id">ID:</label>
//         <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="citi">Citi:</label>
//         <input type="text" id="citi" value={citi} onChange={(e) => setCiti(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="street">Street:</label>
//         <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="building number">Building number:</label>
//         <input type="text" id="buildingNumber" value={buildingNumber} onChange={(e) => setbuildingNumber(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="birthdate">Birthdate:</label>
//         <input type="date" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="phone">Phone:</label>
//         <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="mobilePhone">Mobile Phone:</label>
//         <input type="tel" id="mobilePhone" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
//       </div>
//       <div>
//         <label htmlFor="profilePicture">Profile Picture:</label>
//         <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
//       </div>
//       <button type="submit" onClick={handleSubmit}>Submit</button>
//     </form>
//   );
// };

// export default RegistrationForm


import React, { useState } from 'react';
import '../CSS/RegistrationForm.css';
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  let navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [id, setId] = useState('');
  const [AddressNumber, setAddressNumber] = useState('');
  const [AddressCity, setAddressCity] = useState('');
  const [AddressStreet, setAddressStreet] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phone, setPhone] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

  if (!/^[a-zA-Z]+$/.test(firstName)) {
    alert("First name must contain only letters.");
    return;
  }

  if (!/^[a-zA-Z]+$/.test(lastName)) {
    alert("Last name must contain only letters.");
    return;
  }

  if (id.length !== 9 || (!/^\d+$/.test(id))) {
    alert("ID must contain exactly 9 digits.");
    return;
  }

if (phone.length < 7 || phone.length > 9 || !/^\d+$/.test(phone)) {
  alert("Phone number must contain between 7 and 9 digits.");
  return;
}

if (mobilePhone.length !== 10 || !/^\d+$/.test(mobilePhone)) {
  alert("Mobile phone number must contain exactly 10 digits.");
  return;
}

 const today = new Date();
 const selectedDate = new Date(birthdate);
 if (selectedDate > today) {
   alert("Birthdate must be before today's date.");
   return;
 }
 
    const user = {
      FirstName: firstName,
      LastName: lastName,
      MemberID: id,
      AddressCity: AddressCity,
      AddressStreet: AddressStreet,
      AddressNumber: AddressNumber,
      BirthDate: birthdate,
      Phone: phone,
      MobilePhone: mobilePhone,
      ProfilePicture: profilePicture
    };
    console.log(user);
    addPatientData(user);
  };

  const addPatientData = async (newPatientData) => {
    try {
      const response = await fetch('http://localhost:8080/api/user', {
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
    navigate(`/ViewMembers`);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
  
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value) } required/>
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" value={id} onChange={(e) => setId(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label htmlFor="city">City:</label>
        <input type="text" id="city" value={AddressCity} onChange={(e) => setAddressCity(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="street">Street:</label>
        <input type="text" id="street" value={AddressStreet} onChange={(e) => setAddressStreet(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="buildingNumber">Building number:</label>
        <input type="text" id="buildingNumber" value={AddressNumber} onChange={(e) => setAddressNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="birthdate">Birthdate:</label>
        <input type="date" id="birthdate" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="mobilePhone">Mobile Phone:</label>
        <input type="tel" id="mobilePhone" value={mobilePhone} onChange={(e) => setMobilePhone(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" onChange={(e) => setProfilePicture(e.target.files[0])} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegistrationForm;
