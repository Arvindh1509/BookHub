import React, { useEffect, useState } from 'react'
import { useStateValue } from './Stateprovider'
import CheckoutBook from './CheckoutBook';
import './Payment.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getBasketTotal } from './Reducer';
import CurrencyFormat from 'react-currency-format';
import { PaymentElement,CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import axios from './axios';
// import { Checkbox } from '@mui/material';
// import Subtotal from './Subtotal';

function Payment() {


    const [{user,userAddress,direct_order,checkbox,direct_price},dispatch]=useStateValue();
    const history=useHistory();

    const stripe=useStripe();
    const elements=useElements();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");

    const [error,setError]=useState(null);//prints Card error 
    const [disabled,setDisabled]=useState(true);//decides whether the buy now button should be enabled

  
    const [clientSecret,setClientSecret]=useState(true);

    useEffect(()=>{
      const getClientSecret=async () =>{
        const res=await axios ({
          method:'post',
          url:`/payments/create?total=${direct_price*100}`
        })

        setClientSecret(res.data.clientSecret)
      }
      getClientSecret();
    },[direct_order]); //client secret changed whenever there's a change in the basket 
 

    async function handlePayment(e){
      e.preventDefault();
      setProcessing(true); //to update payment processing is true

      const payload=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card:elements.getElement(CardElement)
        }
      }).then((data)=>{//payment confirmation
        if(data.paymentIntent){
        console.log("PAYMENTINTENT>>>",data.paymentIntent);
        setSucceeded(true); //transaction succeeded
        setError(null);//there's no error
        setProcessing(false);//processing is finished
        
        dispatch({
          type: 'add_to_order',
          payload:{basket:direct_order,price:direct_price}
        });
        dispatch({
          type:"finish_direct"
        })

        history.replace('/OrdersHistory')
        }
        else{
          console.log('ERROR>>>',data.error);

          setError(data.error.message);
          setSucceeded(false)
          setProcessing(false)
        }
      })


    }

    function handleChange(e){//for card errir if customer types incorrect details
      
      setDisabled(e.empty);
       setError(e.error?e.error.message:"");
    }

  return (
    <div className='payment'>
    <div className='payment_container'>
        <h1>CHECKOUT </h1>
    </div>
      <div className='payment_section'>
        <div className='payment_title'>
            <h3>Select Delivery Address</h3>
        </div>
        <div className='payment_address'>
        {/* {console.log(user)} */}
            <p>{user},</p>
            {/* {console.log(userAddress)} */}
            <p>{userAddress}</p>
        </div>
      </div>

      <div className='payment_section'>
        <div className='payment_title'>
            <h3>Review Items and Delivery</h3>
        </div>
        <div className='payment_items'>
            {direct_order.map(item=>(
                <CheckoutBook 
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                />
            ))}
        </div>
      </div>

      <div className='payment_section'>
        <div className='payment_title'>
            <h3>Payment method</h3>
        </div>
        <div className='payment_details'>
            <h5>Choose a payment method</h5>
              <form onSubmit={handlePayment}>
                <CardElement onChange={handleChange}/>
                
                <div className='payment_price'>
                <CurrencyFormat 
                    renderText={(value)=>(
                       <h3>Order Total: <strong>{value}</strong></h3>               
                    )}
                    decimalScale={2}
                    value={direct_price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='₹'
                  />

                  <button disabled={processing||disabled||succeeded}>
                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                  </button>
                </div>
                {error && <div>{error}</div> }
              </form>



            
        </div>
      </div>
      
    </div>
  )
}

export default Payment
