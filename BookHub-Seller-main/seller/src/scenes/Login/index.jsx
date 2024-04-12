import React, { useState } from 'react';
import { Link, Navigate,useNavigate } from 'react-router-dom';
import './Login.css';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import AnimatedPage from '../../components/AnimatedPage';


function LoginSeller() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [{seller},dispatch]=useStateValue();
    const navigate=useNavigate();

    function signin(e) {
        e.preventDefault();
        
        axios.post('/loginSeller',{email,password})
        .then((data)=>{
            setEmail("");
            setPassword("");
            alert("Logged In");
            {console.log(data.data.userEmail)}
            dispatch({
                type:'loginSeller', 
                user:data.data.userName,
                userAddress:data.data.userAddress,
                userEmail:data.data.userEmail,
                userContact:data.data.userContact
            });
         navigate("/dashboard");
        //    return <Navigate to='/' replace={true}/>;
        })
        .catch((error)=>alert(error.response.data));
    }
    return (
        <AnimatedPage>

        <div className='login'>
           
                <img className='login_logo' src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg' alt="Logo"/>
            

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
                <Link to='/registerSeller'>
                    <button  className='login_register'>Not having an Account? Create Your Account</button>
                </Link>
            </div>
        </div>
        </AnimatedPage>
    );
}

export default LoginSeller;
