import React, { useState } from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import axios from '../../axios';
import './index.css'
import { useStateValue } from '../../StateProvider';

function Add_a_book() {
  const [isbn,setIsbn]=useState('');
  const [title,setTitle]=useState('');
  const [img,setImg]=useState('');
  const [author,setAuthor]=useState('');
  const [description,setDescription]=useState('');
  const [price,setprice]=useState('');
  const [quantity,setQuantity]=useState('');
  const [category,setCategory]=useState('');

  const[{seller,sellerEmail}]=useStateValue();



  function handleEvent(e){
    e.preventDefault();
    {if(isbn&&title&&img&&author&&description&&quantity&&price&&category){
    axios.post('/book_insert',{isbn,title,author,img,price,quantity,sellerEmail,category,description})
    .then((data)=>{
      setIsbn('')
      setTitle('')
      setAuthor('')
      setImg('')
      setprice('')
      setDescription('')
      setQuantity('')
      setCategory('')
      alert('Added Successfully') 
    //   history.push('/login');
    })
    .catch((error)=>alert(error.response.data) 
    )}
    else{
     alert("not successful")
    }
    
  }
  }
  return (
    <div className='login'>
        <Box m="1.25rem ">
            <Header title="Add a Book" />
        </Box>
        <div className='register_container'>

        <form >
        {/*ISBN */}
        <h5>New ISBN </h5> 
        <input type='number' value={isbn} onChange={(e)=>{setIsbn(e.target.value);}} className={" register_form"}/>
        
        {/* BOOK TITLE */}
        <h5>New Book Title</h5>
        <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} className='register_form' />

        {/* IMAGE LINK */}
        <h5>Book Image Link </h5>
        <input type='text'value={img} onChange={(e)=>{setImg(e.target.value);}} className={" register_form"} />

        {/* AUTHOR */}
        <h5>Author Name </h5>
        <input type='text' value={author} onChange={(e)=>{setAuthor(e.target.value)}} className={" register_form"} />

        {/* DESCRIPTION */}
        <h5>Description of the Book</h5>
        <input type='text' value={description} onChange={(e)=>{setDescription(e.target.value);}} className='register_form'/>

        {/* CATEGORY */}
        <h5>Category</h5>
        <input type='text' value={category} onChange={(e)=>{setCategory(e.target.value);}} className='register_form'/>

        {/* PRICE */}
        <h5>Quoted Price </h5>
        <input type='number' value={price} onChange={(e)=>{setprice(e.target.value);}} className={'register_form'}/>

        {/* QUANTITY */}
        <h5>Quantity Available</h5>
        <input type='number' value={quantity} onChange={(e)=>{setQuantity(e.target.value);}} className={'register_form'}/>

        {/* SUBMIT BUTTON */}
        <button className='login_signin' type='submit' onClick={(!isbn||!title||!author||!img||!price||!description||!quantity)?()=>{alert("Fill The Required Details")}: handleEvent}>Click to add the book</button>
        </form>
    </div>
    </div>
  )
}

export default Add_a_book
