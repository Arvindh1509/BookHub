import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from './axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useStateValue } from './Stateprovider';


function Login() {
    const history=useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{user},dispatch]=useStateValue();

    function signin(e) {
        e.preventDefault();
        
        axios.post('/login',{email,password})
        .then((data)=>{
            setEmail("");
            setPassword("");
            alert("Logged In");
            {console.log(data.data.userAddress)}
            dispatch({
                type:'login',
                user:data.data.userName,
                userAddress:data.data.userAddress,
                userEmail:data.data.userEmail
            })
            // console.log(data.data.userName);
            history.push('/');
        })
        .catch((error)=>alert(error.response.data));
    }
    return (
        <div className='login'>
            <Link to='/'>
                <img className='login_logo' src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg' alt="Logo"/>
            </Link>

            <div className='login_container'>
                <h1> Sign In </h1>

                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button className='login_signin' type='submit' onClick={signin}> Sign In</button>
                </form>

                <p>
                    By Signing in here you accept to all our term and conditions
                </p>
                <Link to='/register'>
                    <button  className='login_register'>Not having an Account? Create Your Account</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;
