import React, { useState } from 'react';
import SignaturePad from './SignatureCanvas';
import './signaturecanvas.css';
import './accreditation.css';

function SignaturePanel({ onSignatureChange, onDateChange }) {
  const [signature, setSignature] = useState(null);
  const [date, setDate] = useState('');

  const handleSave = (dataUrl) => {
    setSignature(dataUrl);
    // Pass the signature data to the parent component
    onSignatureChange(dataUrl);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
    // Pass the date data to the parent component
    onDateChange(value);
  };

  return (
    <div>
      <h3 id='accreditation-signimage-sig-cont-text'>Signature:</h3>
      <br/> <br />
      <SignaturePad onSave={handleSave} />
      <br /> 
      <br />
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>Date</div>
        <input 
          type="date"  
          required={true}
          className='accreditation-box-input-text'
          value={date}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
}

export default SignaturePanel;
