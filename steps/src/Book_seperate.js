import React from 'react'
import { useStateValue } from './Stateprovider'
import './Book_seperate.css'
import StarIcon from '@mui/icons-material/Star';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Book_seperate() {
    const[{viewedBook,user},dispatch]=useStateValue();
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
            description:viewedBook.description
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
           <div className='book_seperate_rating'>
           <p>{viewedBook.rating} </p>
           {Array(viewedBook.rating).fill().map((_,i)=>(
              <StarIcon className='star'/>
            ))}  
           </div>
           <p className='book_seperate_price'><small>Rs . </small>
           <strong>{viewedBook.price}</strong></p>
           <p className='description'>
            {viewedBook.description}
           </p>

           <button onClick={addtobasket}>Add to Cart</button>
           {/* <button onClick={handleBuynow}>Buy Now</button> */}
           </div>
        </div>
      )}
    </div>
  )
}

export default Book_seperate
