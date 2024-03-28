import React, {useState} from "react";
import "./accreditation.css";
import SignaturePanel from "./Sign";
import logo from '../../assets/logo.png';
import {acc_lc_key, sendformAPI} from './endpoint.jsx';

function Header() {
  return (
    <div id='accredition-header'>
      <a href="https://systemofalltoken.com/" target="_blank" rel="noreferrer">
        <img src={logo} width="100px" alt="SALL Logo" />
      </a>
    </div>
  )
}

function Board1({shouldHide, btnclicknext, btnclickprevious,setFM}) {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    email: '',
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
  const handleFormSubmit = () => {
    btnclicknext();
    setFM(formData)
  }
  const styles = {display: shouldHide ? 'none' : 'block'};
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>Personal Information</h1>
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>Full Name</div>
        <input type="text" required={true} name="fullName" className='accreditation-box-input-text' value={formData.fullName} onChange={handleInputChange} />
      </div>
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>Date of Birth</div>
        <input type="date" required={true} name="dateOfBirth" className='accreditation-box-input-text' value={formData.dateOfBirth} onChange={handleInputChange} />
      </div>
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>Contact Information (Email)</div>
        <input type="email"  required={true} name="email" className='accreditation-box-input-text' value={formData.email} onChange={handleInputChange} />
      </div>
      <BottomTab useContinue={false} next={handleFormSubmit} previous={btnclickprevious} show={formData.fullName && formData.email && formData.dateOfBirth ? true : false} />
    </div>
  );
}

function Board2({shouldHide, btnclicknext, btnclickprevious,setFM}) {
  const [selected, setSelected] = useState([]);
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((value) => value !== e.target.value));
    }
  }
  const handleFormSubmit = (e) => {
    btnclicknext();
    setFM(selected)
  }
  const styles = {display: shouldHide ? 'none' : 'block'};
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>Accredited Investor Criteria</h1>
      <div className='accreditation-box-title-text'>Please check all that apply:</div>
      <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
        <label>
          <input type="checkbox" value="annual_income" onChange={handleCheckboxChange} />
          <span></span>
        </label>
        <div>I have an annual income exceeding $200,000 (or $300,000 with a spouse or domestic partner).</div>
      </div>
      <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
        <label>
          <input type="checkbox" value="net_worth" onChange={handleCheckboxChange} />
          <span></span>
        </label>
        <div>My net worth (excluding my primary residence) exceeds $1 million.</div>
      </div>
      <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
        <label>
          <input type="checkbox" value="issuer_director" onChange={handleCheckboxChange} />
          <span></span>
        </label>
        <div>I am a director, executive officer, or general partner of the issuer. </div>
      </div>
      <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
        <label>
          <input type="checkbox" value="entity_assets" onChange={handleCheckboxChange} />
          <span></span>
        </label>
        <div>I am an entity with total assets exceeding $5 million.</div>
      </div>
      <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
        <label>
          <input type="checkbox" value="financial_professional" onChange={handleCheckboxChange} />
          <span></span>
        </label>
        <div>I have professional experience in financial matters.</div>
      </div>
      <BottomTab useContinue={false} next={handleFormSubmit} previous={btnclickprevious} show={true}/>
    </div>
  );
}

function Board3({ shouldHide, btnclicknext, btnclickprevious,setFM }) {
  const [inputs, setInputs] = React.useState({
    preference1: '',
    preference2: '',
    preference3: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };  
  const handleFormSubmit = (e) => {
    btnclicknext();
    setFM(inputs)
  }
  const styles = {display: shouldHide ? 'none' : 'block'};
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>
        Disqualification for Relevant Criminal Convictions
      </h1>
      <div className='accreditation-box-title-text'>
        Have you ever been convicted of any felony or misdemeanor within the past ten
        years (or five years for issuers, predecessors, and affiliated issuers) that
        involved:
      </div>
      <div className='accreditation-box-subbox'>
        <div>The purchase or sale of any security?</div>
        <div className='accreditation-box-subbox-sub-yesno'>
          <input
            type='radio'
            id='preference1-1'
            name='preference1'
            value='yes'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference1-1'>Yes</label>
          <input
            type='radio'
            id='preference1-2'
            name='preference1'
            value='no'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference1-2'>No</label>
        </div>
      </div>
      <div className='accreditation-box-subbox'>
        <div>
          The making of any false filing with the Securities and Exchange Commission
          (SEC)?
        </div>
        <div className='accreditation-box-subbox-sub-yesno'>
          <input
            type='radio'
            id='preference2-1'
            name='preference2'
            value='yes'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference2-1'>Yes</label>
          <input
            type='radio'
            id='preference2-2'
            name='preference2'
            value='no'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference2-2'>No</label>
        </div>
      </div>
      <div className='accreditation-box-subbox'>
        <div>
          The conduct of the business of an underwriter, broker, dealer,
          municipal securities dealer, investment advisor, or paid solicitor of
          purchasers of securities?
        </div>
        <div className='accreditation-box-subbox-sub-yesno'>
          <input
            type='radio'
            id='preference3-1'
            name='preference3'
            value='yes'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference3-1'>Yes</label>
          <input
            type='radio'
            id='preference3-2'
            name='preference3'
            value='no'
            required={true}
            onChange={handleInputChange}
          />
          <label htmlFor='preference3-2'>No</label>
        </div>
      </div>
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>
          Please provide a brief explanation for any {'"'}Yes{'"'} answers:
        </div>
        <input
          type='email'
          className='accreditation-box-input-text'
          name='explanation'
          onChange={handleInputChange}
        />
      </div>
      <BottomTab
        useContinue={false}
        next={handleFormSubmit}
        previous={btnclickprevious}
        show={inputs.preference1 && inputs.preference2 && inputs.preference3 ? true : false}
      />
    </div>
  );
}

function Board4({ shouldHide, btnclicknext, btnclickprevious,setFM }) {
  const [input, setInput] = React.useState({investmentExperience: ''});
  const handleInputChange = (e) => {
    setInput({investmentExperience: e.target.value});
  };
  const handleFormSubmit = (e) => {
    btnclicknext();
    setFM(input)
  }
  const styles = { display: shouldHide ? 'none' : 'block' };
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>Investment Experience:</h1>
      <div className='accreditation-box-subbox'>
        <div className='accreditation-box-input-title'>
          Describe any prior investment experience, including investments in
          private placements or other securities.
        </div>
        <input
          type='text'
          className='accreditation-box-input-text'
          value={input.investmentExperience}
          onChange={handleInputChange}
          required={true}
        />
      </div>
      <BottomTab
        useContinue={false}
        next={handleFormSubmit}
        previous={btnclickprevious}
        show={input.investmentExperience ? true : false}
      />
    </div>
  );
}

function Board5({ shouldHide, btnclicknext, btnclickprevious,setFM }) {
  const [investmentGoals, setInvestmentGoals] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [investmentHorizon, setInvestmentHorizon] = useState('');
  const [sectorPreferences, setSectorPreferences] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const inputs =  {
      investmentGoals,
      riskTolerance,
      investmentHorizon,
      sectorPreferences,
      sourceOfFunds,
      otherSource
  };
  const handleFormSubmit = (e) => {
    btnclicknext();
    setFM(inputs)
  }
  const styles = { display: shouldHide ? 'none' : 'block' };
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>Investment Goals and Preferences:</h1>
      {/* Investment Objectives */}
      <div>
        <div className='accreditation-box-title-text accreditation-box-title-text-b5'>Investment Objectives:</div>
        <div className='accreditation-box-subbox'>
          <div className='accreditation-box-input-title accreditation-box-titlebox-input-title-light'>What are your primary investment goals? (e.g., capital preservation, growth, income)</div>
          <input type="text" required={true} className='accreditation-box-input-text' value={investmentGoals} onChange={(e) => setInvestmentGoals(e.target.value)} />
        </div>
      </div>

      {/* Risk Tolerance */}
      <div>
        <div className='accreditation-box-title-text accreditation-box-title-text-b5'>Risk Tolerance:</div>
        <div className='accreditation-box-subbox'>
          <div className='accreditation-box-input-title accreditation-box-titlebox-input-title-light'>On a scale of 1 to 10 (1 being very conservative and 10 being highly aggressive), where do you place your risk tolerance?</div>
          <input type="number" required={true} maxLength={10} max={10} className='accreditation-box-input-text' value={riskTolerance} onChange={(e) => setRiskTolerance(e.target.value)} />
        </div>
      </div>

      {/* Investment Horizon */}
      <div>
        <div className='accreditation-box-title-text accreditation-box-title-text-b5'>Investment Horizon:</div>
        <div className='accreditation-box-subbox'>
          <div className='accreditation-box-input-title accreditation-box-titlebox-input-title-light'>How long do you intend to hold your investments? (e.g., short-term, medium-term, long-term)</div>
          <input type="text" required={true} className='accreditation-box-input-text' value={investmentHorizon} onChange={(e) => setInvestmentHorizon(e.target.value)} />
        </div>
      </div>

      {/* Sector Preferences */}
      <div>
        <div className='accreditation-box-title-text accreditation-box-title-text-b5'>Sector Preferences:</div>
        <div className='accreditation-box-subbox'>
          <div className='accreditation-box-input-title accreditation-box-titlebox-input-title-light'>Are there specific sectors or industries you are interested in? (e.g., technology, real estate, healthcare)</div>
          <input type="text" required={true} className='accreditation-box-input-text' value={sectorPreferences} onChange={(e) => setSectorPreferences(e.target.value)} />
        </div>
      </div>

      {/* Source of Funds */}
      <div>
        <div className='accreditation-box-title-text accreditation-box-title-text-b5'>Source of Funds:</div>
        <div className='accreditation-box-input-title accreditation-box-titlebox-input-title-light'>Where will the funds for this investment come from?</div>   
        <div className='accreditation-box-subbox accreditation-box-subbox-forcheck' style={{marginBottom:'0.7em'}}>
          <label>
            <input type="radio" name="incomeSource" value="Savings" onChange={(e) => setSourceOfFunds(e.target.value)} />
            <span></span>
          </label>
          <div>Savings</div>
        </div>
        <div className='accreditation-box-subbox accreditation-box-subbox-forcheck' style={{marginBottom:'0.7em'}}>
          <label>
            <input type="radio" name="incomeSource" value="Inheritance" onChange={(e) => setSourceOfFunds(e.target.value)} />
            <span></span>
          </label>
          <div>Inheritance</div>
        </div>
        <div className='accreditation-box-subbox accreditation-box-subbox-forcheck' style={{marginBottom:'0.7em'}}>
          <label>
            <input type="radio" name="incomeSource" value="Salary" onChange={(e) => setSourceOfFunds(e.target.value)} />
            <span></span>
          </label>
          <div>Salary</div>
        </div>
        <div className='accreditation-box-subbox accreditation-box-subbox-forcheck'>
          <label>
            <input type="radio" name="incomeSource" value="Other" onChange={(e) => setSourceOfFunds(e.target.value)} />
            <span></span>
          </label>
          <div>Other (please specify): <input type="text" className='accreditation-box-input-text' value={otherSource} onChange={(e) => setOtherSource(e.target.value)} /> </div>
        </div>
      </div>
      <BottomTab useContinue={false} next={handleFormSubmit} previous={btnclickprevious} show={inputs.investmentGoals && inputs.riskTolerance && inputs.investmentHorizon && inputs.sectorPreferences && inputs.sourceOfFunds ? true : false} />
    </div>
  );
}

function Board6({ shouldHide, btnclicknext, btnclickprevious,setFM }) {
  const [signature, setSignature] = React.useState(null);
  const [date, setDate] = React.useState('');
  const handleSignatureChange = (signatureData) => {
    setSignature(signatureData);
  };
  const handleDateChange = (date) => {
    setDate(date);
  };
  const inputs = {
    signature,
    date
  }
  const handleFormSubmit = (e) => {
    btnclicknext();
    setFM(inputs)
  }
  const styles = { display: shouldHide ? 'none' : 'block' };
  return (
    <div style={styles}>
      <h1 className='accreditation-box-title'>Certification</h1>
      <div className='accreditation-box-title-text'>By signing below, I certify that the information provided in this questionnaire is accurate and complete to the best of my knowledge. I understand that any material misstatements or omissions may constitute grounds for disqualification.</div>
      <SignaturePanel 
        onSignatureChange={handleSignatureChange} 
        onDateChange={handleDateChange} 
      />
      <BottomTab useContinue={false} next={handleFormSubmit} previous={btnclickprevious} show={date ? true : false} />
    </div>
  );
}

function Board7({shouldHide,btnclicknext,btnclickprevious,form}) {
 const styles = {display: shouldHide ? 'none' : 'block'}
 const [whatshouldrender,setwhatshouldrender] = useState('app')
async function sendToDB() {
  setwhatshouldrender('loader');
  try {
    const response = await fetch(sendformAPI, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const acc_lc_key_value = {key: acc_lc_key};
    console.log('Setting local storage item:', acc_lc_key_value);
    localStorage.setItem('acc_lc_key', JSON.stringify(acc_lc_key_value));
    window.location.href = '/';
  } catch (error) {
    console.error(error);
    setwhatshouldrender('app')
  }
}
 return (
    <div style={styles}>
      {whatshouldrender === 'app' ? (
      <>
      <h1 className='accreditation-box-title'>Disclaimer</h1>
      <div className='accreditation-box-title-text'>Remember that this questionnaire is intended for informational purposes only and should not be considered legal advice. Always consult with legal professionals to ensure compliance with relevant regulations and tailor the document to your specific circumstances. Review carefully and use at your own risk.</div>
      <BottomTab useContinue={true} next={sendToDB} previous={btnclickprevious} show={true} />
      </> ) :
      <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:5,backgroundColor:'rgba(10,10,10,0.5)'}}></div>
      }
    </div>
 )
}





function BottomTab({useContinue,next,previous,show}) {
 const handleClick = () => {
    next();
    // console.log(next)
 }
 return (
    <div id='accreditation-footer'>
      <button onClick={previous}>PREVIOUS</button>
     {/* <button id='accreditation-footer-next-btn' onClick={handleClick}>{useContinue === true ? 'CONTINUE' : 'NEXT'}</button> */}
      {show && <button id='accreditation-footer-next-btn' onClick={handleClick}>{useContinue === true ? 'CONTINUE' : 'NEXT'}</button>}
    </div>
 )
}

function Container() {
 const [currentTab, setcurrentTab] = useState('1')
 const [formData1, setformData1] = useState({})
 const [formData2, setformData2] = useState({})
 const [formData3, setformData3] = useState({})
 const [formData4, setformData4] = useState({})
 const [formData5, setformData5] = useState({})
 const [formData6, setformData6] = useState({})

 const FORM = {
   form1: formData1,
   form2: formData2,
   form3: formData3,
   form4: formData4,
   form5: formData5,
   form6: formData6
 }
 return (
    <div id='accreditation-container'>
      <Board1 shouldHide={currentTab === '1' ? false : true} btnclicknext={()=> setcurrentTab('2')} btnclickprevious={()=> setcurrentTab('1')} setFM={setformData1}/>
      <Board2 shouldHide={currentTab === '2' ? false : true} btnclicknext={()=> setcurrentTab('3')} btnclickprevious={()=> setcurrentTab('1')} setFM={setformData2} />
      <Board3 shouldHide={currentTab === '3' ? false : true} btnclicknext={()=> setcurrentTab('4')} btnclickprevious={()=> setcurrentTab('2')} setFM={setformData3} />
      <Board4 shouldHide={currentTab === '4' ? false : true} btnclicknext={()=> setcurrentTab('5')} btnclickprevious={()=> setcurrentTab('3')} setFM={setformData4} />
      <Board5 shouldHide={currentTab === '5' ? false : true} btnclicknext={()=> setcurrentTab('6')} btnclickprevious={()=> setcurrentTab('4')} setFM={setformData5} />
      {currentTab === '6' ? <Board6 shouldHide={currentTab === '6' ? false : true} btnclicknext={()=> setcurrentTab('7')} btnclickprevious={()=> setcurrentTab('5')} setFM={setformData6} /> : ''}
      <Board7 shouldHide={currentTab === '7' ? false : true} btnclicknext={()=> setcurrentTab('')} btnclickprevious={()=> setcurrentTab('6')}  form={FORM}  />
    </div>
 )
}

export default function Accreditation() {
  return (
    <>
     <Header />
     <Container />
    </>
  )
}
