import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutBook from './CheckoutBook';
import { useStateValue } from './Stateprovider';
import { getBasketTotal } from './Reducer';
import AnimatedPage from './AnimatedPage';

function Wishlist() {
  const [{basket,checkbox,favourite,viewedBook}]=useStateValue();

  console.log("Length of Wishlist",favourite.length)

  return (
    <AnimatedPage>

    <div className='checkout'>
    {/* {console.log("The basket price>>>",getBasketTotal(basket,!checkbox))} */}
      <div className='checkout-left'>
       <div>
        <h2 className='checkout_title'>
           Your Wish List !
        </h2>

        {console.log(basket)}
 
{favourite.length>0?favourite.map(item => (
    <CheckoutBook
        key={item.id} // Assuming you need a key prop for each item in a list
        id={item.id}
        title={item.title}
        image={item.image}
        price={item.price}
        rating={item.rating} 
        description={item.description}
        hidebutton={false}
        quantity={item.quantity}
        category={item.category}
        seller={item.seller}

        favour={true}
    />
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
