import React, {  useState } from 'react'
import { useStateValue } from '../../StateProvider'
import './index.css'
import Header from '../../components/Header';
import { Box } from '@mui/material'
import axios from '../../axios'


function Your_Profile() {

    const [{seller,sellerAddress,sellerContact,sellerEmail},dispatch]=useStateValue();
    const [edit,setEdit]=useState(false);

    const [name,setName]=useState(seller);
    const [address,setAddress]=useState(sellerAddress)
    const [contact,setContact]=useState(sellerContact)

    function handleSave(){
      axios.post('/editSeller',{name,address,contact,sellerEmail})
      .then(
        dispatch({
          type: 'editSeller',
          user:name,
          userAddress:address,
          userContact:contact
        })
      )
    }

  return (
    <div>
      <Box m="1.25rem ">
            <Header title={`Hi!, ${seller}`} />
            
        </Box>
    
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
            <input value={sellerEmail} disabled />
          </td>
        </tr>
        <tr>
          <td>Your Name</td>
          <td>
            <input className='Profile_Div' value={name} disabled={edit==false?true:false}
            onChange={(e)=>setName(e.target.value)} />
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
          <td> Contactno</td>
          <td>
            <input className='Profile_Div' value={contact} disabled={edit==false?true:false}
              onChange={(e)=>setContact(e.target.value)}
            />
          </td>
        </tr>
       </table>
    </div>
    </div>
    </div>
  )
}

export default Your_Profile
