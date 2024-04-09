import React, { useState } from 'react'
import { useStateValue } from './Stateprovider'
import './Book_seperate.css'
import StarIcon from '@mui/icons-material/Star';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Book_seperate() {
    const[{viewedBook,user},dispatch]=useStateValue();
    const [selectQ,setSelectQ] = useState(1);

    function handlequantity(e){ 
      console.log(e);
      setSelectQ(e)
    }
    const history=useHistory();

    function addtobasket(){
        if(viewedBook){
        dispatch({
          type:'add_to_basket',
          item:{
            key:viewedBook.id,
            id:viewedBook.id,
            title:viewedBook.title,
            price:viewedBook.price,
            rating:viewedBook.rating,
            image:viewedBook.image,
            description:viewedBook.description,
            quantity:selectQ,
            category:viewedBook.category,
            seller:viewedBook.seller
        }
        })}
      }

    //  function handleBuynow(){
    //  if(viewedBook){
    //     dispatch({
    //       type:'direct_order',
    //       item:{
    //         key:viewedBook.id,
    //         id:viewedBook.id,
    //         title:viewedBook.title,
    //         price:viewedBook.price,
    //         rating:viewedBook.rating,
    //         image:viewedBook.image,
    //         description:viewedBook.description
    //     },
    //     price:viewedBook.price
    //     })}
    //     if(user){
    //       history.replace("/login")
    //     }
    //     else{
    //     history.replace("/Payment_direct")}
    //  } 

   
  return (
    <div>
      {/* <h1>Book Details</h1> */}
      {viewedBook &&( 
        
        <div className='book_seperate'>
          <img src={viewedBook.image}/>
          <div className='second_section'>
            <p className='book_seperate_title'><strong>{viewedBook.title}</strong></p>
            <p>{viewedBook.category}</p>
              <div className='book_seperate_rating'>
                <p>{viewedBook.rating} </p>
                  {Array(viewedBook.rating).fill().map((_,i)=>(
                      <StarIcon className='star'/>
                    ))}  
              </div>
            <p className='book_seperate_price'><small>Rs . </small>
            <strong>{viewedBook.price}</strong></p>
            <label>
              Quantity:
              <select name="Quantity_number" onChange={(e)=>handlequantity(e.target.value)}>
              {Array.from({length:(viewedBook.quantity)>30?25:  viewedBook.quantity }, (_, index) => (
              <option key={index+1} value={index+1}>
                {index+1}
              </option>
               ))}
              </select>
            </label>
            <p className='description'>
              {viewedBook.description}
            </p>

            <p>Seller : {viewedBook.seller}</p>
              {viewedBook.quantity>=1?<button onClick={addtobasket}>Add to Cart</button>
              :""}
           
           {/* <button onClick={handleBuynow}>Buy Now</button> */}
           </div>
        </div>
      )}
    </div>
  )
}

export default Book_seperate
