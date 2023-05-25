import React from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { GiBlackBook } from "react-icons/gi";


const ToastNotif = ({ showToast, onClose, bodyToast }) => {

  return (
    <ToastContainer className="toast-container bottom-left">
      <Toast
        show={showToast}
        onClose={onClose}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          opacity: 0.9,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <GiBlackBook className='mx-2' /> <strong className="me-auto">Booked</strong>
        </Toast.Header>
        <Toast.Body>{bodyToast}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotif;
