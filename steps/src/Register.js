import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from './axios';
import './Register.css';
import AnimatedPage from './AnimatedPage';



function Register() {
  const history=useHistory();
  const [FirstName,setFirstName]=useState('');
  const [lastName,setLastName]=useState('');
  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');
  const [deliveryaddress,setDeliveryaddress]=useState('');
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
    {if(FirstName&&email&&pwd&&contactno){
    axios.post('/register',{FirstName,lastName,email,pwd,deliveryaddress,contactno})
    .then((data)=>{
      setFirstName("");
      setLastName("");
      setEmail("");
      setPwd("")
      setDeliveryaddress("")
      setContactno("")
      setEmailError("")
      setPhoneerror("")
      alert('Registered Successfully') 
      history.push('/login');
    })
    .catch((error)=>alert(error.response.data) 
    )}
    else{
      if(!FirstName)      
      setUsername('Please enter a username');
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
    <Link to='/'>
      <img className='login_logo' src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg'/>
    </Link>

    <div className='register_container'>
        <h1> Sign Up </h1>

        <form >
        {/* FIRST NAME */}
        <h5>First Name <span><small className='error'>*</small></span></h5> 
        <input type='tel' value={FirstName} onChange={(e)=>{setFirstName(e.target.value);
        HandleUsername(e.target.value)}}
          className={username ? 'register_form_error' : 'register_form'}
        />
        {username && <p className='error'>{username}</p>}

        {/* LAST NAME */}
        <h5>Last Name</h5>
        <input type='text' value={lastName} onChange={(e)=>setLastName(e.target.value)}
          className='register_form'
        />

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
        <h5>Delivery Address</h5>
        <input type='text' value={deliveryaddress} onChange={(e)=>{setDeliveryaddress(e.target.value);
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
        <Link to='/login'>
        <button className='login_register'>Back to Login</button>
        </Link>
    </div>
    </div>
    </AnimatedPage>
  )
}

export default Register
