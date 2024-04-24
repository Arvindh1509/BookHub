import React, { useEffect, useState } from 'react'
import './Checkout.css';
import CheckoutBook from './CheckoutBook';
import { useStateValue } from './Stateprovider';
import AnimatedPage from './AnimatedPage';
import axios from './axios';

function Wishlist() {
  const [{userEmail},dispatch]=useStateValue();
  const [favBooks,setFavBooks]=useState(null)
  useEffect(()=>{
    axios.post('/getfav',{userEmail})
    .then((result)=>{
      const data=result.data; 
      setFavBooks(data); 
    }) 
    .catch(error=>{
      console.log("error:",error);
    })
  },[favBooks])

  return (
    <AnimatedPage>

    <div className='checkout'>
    
      <div className='checkout-left'>
       <div>
        <h2 className='checkout_title'>
           Your Wish List !
        </h2>

{favBooks?favBooks.map(items=>(
  items.map(item=>(
    <CheckoutBook
        key={item[0]} // Assuming  you need a key prop for each item in a list
        id={item[0]}
        title={item[1]}
        image={item[3]}
        price={item[4]} 
        rating={item[5]}  
        hidebutton={false} 
        quantity={item[6]}
        category={item[7]}
        seller={item[8]}
        favour={true}
    />
  ))
 
)):
<div className='NoFavs'>
<h3 >No Items in the wishlist!</h3>
</div>
}

       </div>
      </div>
    </div>
    </AnimatedPage>
  )
}

export default Wishlist
