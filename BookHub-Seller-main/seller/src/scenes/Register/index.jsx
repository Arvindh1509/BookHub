import React, { useState } from 'react'
import axios from '../../axios';
import './Register.css';
import { Link, Navigate } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';



function RegisterSeller() {
  const [company,setCompany]=useState('');
  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');
  const [companyaddress,setCompanyaddress]=useState('');
  const [contactno,setContactno]=useState('');
  const [Emailerror, setEmailError] = useState('');
  const [Phoneerror,setPhoneerror]=useState('');
  const [username,setUsername]=useState('');
  const [passwordError,setPasswordError]=useState('');

function HandleUsername(e) {
  const validUsername = e.trim().length > 0;

  if (!validUsername) {
    setUsername('Please enter a username');
  } else {
    setUsername('');
  }
}

function handlError(e){
  const emailPattern = /\S+@\S+\.\S+/;
  
  if (!emailPattern.test(e)) {
    setEmailError('Please enter a valid email address');
  }
  else{
    setEmailError('');
  }
}

function HandlePassword(e) {
  const validUsername = e.trim().length > 0;

  if (!validUsername) {
    setPasswordError('Please enter a password');
  } else {
    setPasswordError('');
  }
}

function HandlePhone(e){
  const validContactNo = /^\d{10}$/.test(e);

  if (!validContactNo) {
    setPhoneerror('Please enter a valid 10-digit contact number');}
  else{
    setPhoneerror('');
  }
}

  function handleEvent(e){
    e.preventDefault();
    {if(company&&email&&pwd&&contactno){
    axios.post('/registerSeller',{company,email,pwd,companyaddress,contactno})
    .then((data)=>{
      setCompany("");
      setEmail("");
      setPwd("")
      setCompanyaddress("")
      setContactno("")
      setEmailError("")
      setPhoneerror("")
      alert('Registered Successfully') ;
     { <Navigate to='/loginSeller' replace={true}/>}
    
    })
    .catch((error)=>alert(error.response.data) 
    )}
    else{
      if(!company)      
      setUsername('Please enter a Enterprise Name');
      if(!email) 
      setEmailError('Please enter a valid email address');
      if(!pwd) 
      setPasswordError('Please enter a password');
      if(!contactno) 
      setPhoneerror('Please enter a valid 10-digit contact number');
    }
    
  }
  }

  return (
    <AnimatedPage>

    <div className='login'>
      <img className='login_logo' src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg'/>
    

    <div className='register_container'>
        <h1> Sign Up As New Seller! </h1>

        <form >
        {/* ENTERPRISE NAME */}
        <h5>Enterprise Name <span><small className='error'>*</small></span></h5> 
        <input type='text' value={company} onChange={(e)=>{setCompany(e.target.value);
        HandleUsername(e.target.value)}}
          className={username ? 'register_form_error' : 'register_form'}
        />
        {username && <p className='error'>{username}</p>}

        {/* EMAIL ID */}
        <h5>Email <span><small className='error'>*</small></span></h5>
        <input type='email'value={email} onChange={(e)=>{setEmail(e.target.value);
        handlError(e.target.value);}} 
          className={Emailerror ? "register_form_error": " register_form"}
        />
        {Emailerror && <p className='error'>{Emailerror}</p>}

        {/* PASSWORD */}
        <h5>Password <span><small className='error'>*</small></span></h5>
        <input type='password' value={pwd} onChange={(e)=>{setPwd(e.target.value)
        HandlePassword(e.target.value)}}
        className={passwordError ? "register_form_error": " register_form"}
        />
        {passwordError && <p className='error'>{passwordError}</p>}

        {/* ADDRESS */}
        <h5>Enterprise Address</h5>
        <input type='text' value={companyaddress} onChange={(e)=>{setCompanyaddress(e.target.value);
         }}
          className='register_form'
        />

        {/* CONTACT NO. */}
        <h5>Contact Phone <span><small className='error'>*</small></span></h5>
        <input type='tel' value={contactno} onChange={(e)=>{setContactno(e.target.value);
        HandlePhone(e.target.value)}}
          className={Phoneerror ? 'register_form_error' : 'register_form'}
        />
        {Phoneerror && <p className='error'>{Phoneerror}</p>}

        {/* SUBMIT BUTTON */}
        <button className='login_signin' type='submit' onClick={(username||Phoneerror||Emailerror||passwordError)?()=>{alert("Fill The Required Details")}: handleEvent}> Sign Up</button>
        </form>

        <p>
            By Signing in here you accept to all our term and conditions
        </p>

        {/* LOGIN BUTTON */}
        <Link to='/loginSeller'>
        <button className='login_register'>Back to Login</button>
        </Link>
    </div>
    </div>
    </AnimatedPage>
  )
}

export default RegisterSeller
