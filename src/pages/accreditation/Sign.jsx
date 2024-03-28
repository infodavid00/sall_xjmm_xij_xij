import React, { useState, useRef } from 'react';
import SignaturePad from './SignatureCanvas';
import './signaturecanvas.css';
import './accreditation.css';

function SignaturePanel({ onSignatureChange, onDateChange }) {
  const [signature, setSignature] = useState(null);
  const [date, setDate] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const titleRef = useRef();

  const handleSave = (dataUrl) => {
    setSignature(dataUrl);
    onSignatureChange(dataUrl);
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setDate(value);
    onDateChange(value);
  };

  const handleMount = () => {
    setIsMounted(true);
  };

  return (
    <>
      <div onLoad={handleMount}>
        <h3 id='accreditation-signimage-sig-cont-text'>Signature:</h3>
        <br />
        <br />
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
      {!isMounted && (
        <div>
          <p>
            Initialize your scenario here. The content will only be displayed before
            the component mounts.
          </p>
          <input
            ref={titleRef}
            type="text"
            defaultValue={"Enter a title here"}
          />
          <button onClick={() => setIsMounted(true)}>Mount</button>
        </div>
      )}
    </>
  );
}

export default SignaturePanel;