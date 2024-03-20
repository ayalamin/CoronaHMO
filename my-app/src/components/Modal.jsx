
import React, { useState } from 'react';
import RegistrationForm from './RegistrationForm'; // Import your registration form component
import '../CSS/RegistrationForm.css';

const Modal = () => {
  console.log("in modal")

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    debugger
    setShowModal(true);
    debugger
  };

  const closeModal = () => {
    debugger
    setShowModal(false);
    debugger
  };

  return (
    <div>
      <button onClick={openModal}>Registration</button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <RegistrationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
