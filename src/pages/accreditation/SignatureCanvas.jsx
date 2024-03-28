// import React, { useRef } from 'react';
// import SignatureCanvas from 'react-signature-canvas';
// import './signaturecanvas.css';

// const SignaturePad = ({ onSave }) => {
//   const sigCanvas = useRef(null);

//   const clearCanvas = () => {
//     sigCanvas.current.clear();
//     onSave(sigCanvas.current.toDataURL());
//   };

//   return (
//     <>
//       <SignatureCanvas
//         ref={sigCanvas}
//         canvasProps={{ id: 'signatureCanvas' }}
//         onEnd={() => onSave(sigCanvas.current.toDataURL())}
//       />
//       <button onClick={clearCanvas} id='accredition-sign-clear-btn'>Clear Signature</button>
//     </>
//   );
// };

// export default SignaturePad;



import React from 'react';
import SignaturePad from 'react-signature-pad';

class SignaturePadExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: null
    };

    this.handleBeginSign = this.handleBeginSign.bind(this);
    this.handleEndSign = this.handleEndSign.bind(this);
  }

  handleBeginSign() {
    // This method will be called when the user begins drawing the signature.
  }

  handleEndSign() {
    this.setState({
      signature: this.signaturePad.getTrimmedCanvas().toDataURL()
    });
  }

  render() {
    return (
      <SignaturePad
        style={styles.signaturePad}
        ref={sigPad => this.signaturePad = sigPad}
        onBeginSign={this.handleBeginSign}
        onEndSign={this.handleEndSign}
        canvasProps={{
          className: 'custom-canvas-class'
        }}
      />
    );
  }
}

const styles = {
  signaturePad: {
    border: '1px solid black',
    width: 400,
    height: 200
  }
};

export default SignaturePadExample;