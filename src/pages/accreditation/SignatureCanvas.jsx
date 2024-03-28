import React, { useRef, useEffect, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './signaturecanvas.css';

const SignaturePad = ({ onSave }) => {
  const [isCanvasMounted, setIsCanvasMounted] = useState(false);
  const sigCanvas = useRef(null);

  useEffect(() => {
    setIsCanvasMounted(true);
  }, []);

  const clearCanvas = () => {
    sigCanvas.current.clear();
    onSave(sigCanvas.current.toDataURL());
  };

  return (
    <div>
      {isCanvasMounted && (
        <>
          <SignatureCanvas
            ref={sigCanvas}
            canvasProps={{ id: 'signatureCanvas' }}
            onEnd={() => onSave(sigCanvas.current.toDataURL())}
          />
          <br />
          <button onClick={clearCanvas} id='accredition-sign-clear-btn'>Clear Signature</button>
        </>
      )}
    </div>
  );
};

export default SignaturePad;