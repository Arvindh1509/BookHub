import React, { useState } from 'react'
import axios from 'axios';

function Signin(){
    const [empno,setEmpno]=useState('');
    const [ename,setEname]=useState('');
    const[sal,setSal]=useState('');

    const Submit= async(e)=>{
        
        try {
            await axios.post('/signin',{empno,ename,sal});
            alert('sign in succesfull');
            
        } catch (error) {
            console.log(error)
            alert('error signing in');
        }
    }

    return(
        <div>
            <h1>Signin</h1>
            <form onSubmit={Submit}>
                <label>Empno:
                <input type='text' value={empno} onChange={(e)=>setEmpno(e.target.value)}/>
                </label>

                <label>
                    Ename:
                    <input type='text' value={ename} onChange={(e)=>setEname(e.target.value)}/>
                </label>
                <label>
                    Sal:
                    <input type='text' value={sal} onChange={(e)=>setSal(e.target.value)}/>
                </label>
                <button type='submit'>Store</button>
            </form>
        </div>
    )
}




export default Signin
