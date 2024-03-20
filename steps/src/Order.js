import React from 'react'
import CheckoutBook from './CheckoutBook'
import { useStateValue } from './Stateprovider';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import './Order.css';

function Order({id,title,image,price,rating}) {
    const [{order,checkbox,user,userEmail}]=useStateValue();
    const today = new Date();
  
  const day = today.getDate();
  const month = today.getMonth() + 1; 
  const year = today.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className='Order'>
        <div className='order_header'>
        <div>
        <p><strong>Order placed on</strong></p>
        <p>{formattedDate}</p>
        </div>
        {checkbox?<p className='gift'>This is a gift</p>:""}
        {/* {console.log("Error is here")} */}
<CurrencyFormat 
                    renderText={(value)=>(
                        <div className='currency'>
                       <h4>Order Total:</h4>               
                       <p>{value}</p>
                       </div>
                    )}
                    decimalScale={2}
                    value={0} 
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='₹'
                  />
        <div className='order_header_address'>
        <h4>Ship to</h4>
        <p>{user}</p>
        </div>
        </div>
      
      <div className='order_container'>
      {/* {console.log("ORDER IS >>>",order[0][0].price)} */}
      
    <CheckoutBook
        key={id} // Assuming you need a key prop for each item in a list
        id={id}
        title={title}
        image={image}
        price={price}
        rating={rating} 
        hidebutton ={false}
    />

      </div>
      
    </div>
    
  )
}

export default Order
