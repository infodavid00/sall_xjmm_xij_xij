import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './signaturecanvas.css';

const SignaturePad = ({ onSave }) => {
  const sigCanvas = useRef(null);

  const clearCanvas = () => {
    sigCanvas.current.clear();
    onSave(sigCanvas.current.toDataURL());
  };

  return (
    <>
      <SignatureCanvas
        ref={sigCanvas}
        canvasProps={{ id: 'signatureCanvas' }}
        onEnd={() => onSave(sigCanvas.current.toDataURL())}
      />
      <button onClick={clearCanvas} id='accredition-sign-clear-btn'>Clear Signature</button>
    </>
  );
};

export default SignaturePad;