import React from 'react'
import './Checkout.css';
import Subtotal from './Subtotal';
import CheckoutBook from './CheckoutBook';
import { useStateValue } from './Stateprovider';
import { getBasketTotal } from './Reducer';
import AnimatedPage from './AnimatedPage';

function Checkout() {
  const [{basket,checkbox,viewedBook}]=useStateValue();
  return (
    <AnimatedPage>

    <div className='checkout'>
    {console.log("The basket price>>>",getBasketTotal(basket,!checkbox))}
      <div className='checkout-left'>
       <div>
        <h2 className='checkout_title'>
            Shopping Basket
        </h2>

        {console.log(basket)}
 
{basket.map(item => (
    <CheckoutBook
        key={item.id} // Assuming you need a key prop for each item in a list
        id={item.id}
        title={item.title}
        image={item.image}
        price={item.price}
        rating={item.rating} 
        description={item.description}
        hidebutton={true}
        quantity={item.quantity}
        category={item.category}
        seller={item.seller}
    />
))}


       </div>
      </div>

      <div className='checkout_right'>
      <Subtotal/>
       
      </div>


    </div>
    </AnimatedPage>
  )
}

export default Checkout
