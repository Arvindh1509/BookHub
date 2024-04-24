import React, { useEffect, useState } from 'react'
import { useStateValue } from './Stateprovider'
import CheckoutBook from './CheckoutBook';
import './Payment.css'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getBasketTotal } from './Reducer';
import CurrencyFormat from 'react-currency-format';
import { PaymentElement,CardElement,useElements, useStripe, Elements } from '@stripe/react-stripe-js';
import axios from './axios';
import CheckoutForm from './PaymentPortalForm';
import AnimatedPage from './AnimatedPage';

// import { Checkbox } from '@mui/material';
// import Subtotal from './Subtotal';

function Payment({promise}) {

  
  console.log("NEXT RENDER ---------------")
  console.log(promise);

    const [{user,userAddress,userEmail,basket,checkbox},dispatch]=useStateValue();
    // basket.map(item=>{
    //     console.log("ids in the basket",item.id);
    // }) 
    
    // console.log("this is userEmail>>",userEmail );
    const history=useHistory();
 
    const stripe=useStripe();
    const elements=useElements();

    const [succeeded,setSucceeded]=useState(false);
    const [processing,setProcessing]=useState("");

    const [error,setError]=useState(null);//prints Card error 
    const [disabled,setDisabled]=useState(true);//decides whether the buy now button should be enabled

  
    const [clientSecret,setClientSecret]=useState(true);
    console.log("firsttime>>>",clientSecret);
    
    const total=getBasketTotal(basket,!checkbox)*100;

    useEffect(()=>{
      const getClientSecret=async () =>{
        const res=await axios ({
          method:'post',
          url:`/payments/create?total=${total}`
        })

        setClientSecret(res.data.clientSecret)
        console.log(clientSecret);
       
      } 
      getClientSecret();
    },[basket]); //client secret changed whenever there's a change in the basket 
 

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
        
        var orderId =""
        axios.post('/order_placing',{userEmail,total:(total),gift:checkbox})
        .then((response)=>{
          orderId=response.data[0]
          console.log("This is OrderID",orderId);
          {basket.map(item=>(
            axios.post('/order_items_placing',{orderId:orderId,id:item.id,quantity:item.quantity,price:(item.quantity)?item.price*item.quantity:item.price})
           
           ))}
        })         
 
        dispatch({
          type: 'add_to_order',
          payload:{basket:basket,price:getBasketTotal(basket,!checkbox)}
        });
        dispatch({
          type:"empty_basket"
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

    function razorpay(e){
    
      e.preventDefault();
      if(total==0){
        alert("please enter amount");
      }else{
        console.log("HIIIIIIIIIIII",total);
        
        var options={
          key:"rzp_test_sd095naLU4rfSS",
          key_secret:"yL6GOwd56hVBBZIGvvwNPVs8",
          amount:total,
          currency:"INR",
          name:"Projects",
          description:"for sample testing",
          handler:function(response){
            alert("Payment Successfully Completed with Payment ID:",response.razorpay_payment_id);
            const done=response.razorpay_payment_id;
            {done && 
              setSucceeded(true); //transaction succeeded
              setError(null);//there's no error
              setProcessing(false);//processing is finished
              
              var orderId =""
              axios.post('/order_placing',{userEmail,total:(total),gift:checkbox})
              .then((response)=>{
                orderId=response.data[0]
                // console.log("This is OrderID",orderId);
                {basket.map(item=>(
                  axios.post('/order_items_placing',{orderId:orderId,id:item.id,quantity:item.quantity,price:(item.quantity)?item.price*item.quantity:item.price})
                 ))}}
                )

                dispatch({
                  type: 'add_to_order',
                  payload:{basket:basket,price:getBasketTotal(basket,!checkbox)}
                });
                dispatch({
                  type:"empty_basket"
                })
                
        
                history.push('/OrdersHistory')
                
          }
        },
          prefill:{
            name:"arvindh",
            email:"rockstararvindh@gmail.com",
            contact:"9345198715"
          },
          notes:{
            address:"RazorPay Corporate Office"
          },
          theme:{
            color:"#3399cc"
          }
        };
        var pay=new window.Razorpay(options);
        pay.open();
        
      }
    }


    function handleChange(e){//for card errir if customer types incorrect details
      
      setDisabled(e.empty);
       setError(e.error?e.error.message:"");
    }

  return (
    <AnimatedPage>
    <div className='payment'>
    <div className='payment_container'>
        <h1>CHECKOUT (
            <Link to='/checkout'>{basket?.length} items</Link>
        )</h1>
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
            {basket.map(item=>(
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
                {/* {clientSecret && promise && (
        <Elements stripe={promise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
      <h4>RazorPay:</h4>
        <button className='rzpaybtn' onClick={razorpay}>
          <img className='razorpay' src='https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg' alt='razorpay'/>
        </button>
                
                <div className='payment_price'>
                <CurrencyFormat 
                    renderText={(value)=>(
                       <h3>Order Total: <strong>{value}</strong></h3>               
                    )}
                    decimalScale={2}
                    value={getBasketTotal (basket,!checkbox)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='₹'
                  />
                  </div>
                  <div className='buynow'>
                  <button className="buynow_button" disabled={processing||disabled||succeeded}>
                    <span>{processing ? <p>Processing</p>:"Buy Now"}</span>
                  </button>
                  </div>
                
                {error && <div>{error}</div> }
              </form>



            
        </div>
      </div>
      
    </div>
    </AnimatedPage>
  )
}

export default Payment
