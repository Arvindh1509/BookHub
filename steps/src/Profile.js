import React, {  useState } from 'react'
import { useStateValue } from './Stateprovider';
import './Profile.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AnimatedPage from './AnimatedPage';
import axios from './axios';


function Profile() {

    const [{user,userLastname,userEmail,userAddress,userContact},dispatch]=useStateValue();
    const [edit,setEdit]=useState(false);
    const history=useHistory();
    const [name,setName]=useState(user);
    const [lastName,setLastName]=useState(userLastname);
    const [address,setAddress]=useState(userAddress)
    const [contact,setContact]=useState(userContact)
   
    

    function handleSave(){
      axios.post('/editBuyer',{name,lastName,address,contact,userEmail})
      .then(
        dispatch({
          type: 'editBuyer',
          user:name,
          userAddress:address,
        })
      )
    }

  return (
   

    user?(
      <AnimatedPage>
    <div>
      <h1>Hi {user}</h1>
    
    <div className='login'>
      <div className='Profile_header'>
        {edit===true?
          <button onClick={()=>{setEdit(!edit)
            handleSave();          
          }  
          }>SAVE</button>
          :<button onClick={()=>setEdit(!edit)}>EDIT</button>}
        
        </div>
        <div className='register_container'>
       <table className='Profile_Body'>
        <tr>
          <td>Your Email</td>
          <td>
            <input value={userEmail} disabled />
          </td>
        </tr>
        <tr>
          <td>Your First Name</td>
          <td>
            <input className='Profile_Div' value={name} disabled={edit==false?true:false}
            onChange={(e)=>setName(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td>Your Last Name</td>
          <td>
            <input className='Profile_Div' value={lastName} disabled={edit==false?true:false}
            onChange={(e)=>setLastName(e.target.value)} />
          </td>
        </tr>
        <tr>
          <td>Your Address</td>
          <td>
            <input className='Profile_Div' value={address} disabled={edit==false?true:false}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </td>
        </tr>
        <tr>
          <td>Your Contact Number</td>
          <td>
            <input className='Profile_Div' value={contact} disabled={edit==false?true:false}
            onChange={(e)=>setContact(e.target.value)} />
          </td>
        </tr>
       </table>
    </div>
    </div>
    </div>
    </AnimatedPage>):history.push('/login')
    // 
    
  )
}

export default Profile
