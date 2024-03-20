import React, { useEffect, useState } from 'react'
import { useStateValue } from './Stateprovider'
import './OrderHistory.css'
import axios from './axios';
import CheckoutBook from './CheckoutBook';
import CurrencyFormat from 'react-currency-format';
import './Order.css';

function OrdersHistory() {

  const [{checkbox,user,userEmail}]=useStateValue();
 const [orderData,setOrderData]=useState(null);
 const [totalAmt,setTotalAmt] = useState();
 var total={};
  useEffect(()=>{ 
    axios.post('/ordersHistory',{userEmail:userEmail})
    .then((result)=>{
      const data=result.data;
      setOrderData(data);
      Object.keys(data.orderid).map(orderId=>{
        var subtotal=0;
        data.orderisbns[data.orderid[orderId]].map(o=>{
          subtotal=subtotal+o[4];
        })
        // console.log("SUBTOTAL>>>"+subtotal);
        total[data.orderid[orderId]]=subtotal;
        setTotalAmt(total);
        // console.log("SAMPLE>>>",total[data.orderid[orderId]])
      }) 
    })
    .catch(error=>{
      console.log("error:",error);  
    }) 

    // console.log("TOTAL",total);
  },[]); 

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();
const formattedDate = `${day}-${month}-${year}`;
console.log("sddfg",total);
return (
  <div className='orders'>
    <div className='order_title'>
      <h1>Orders History</h1>    
    </div>  
    {
      orderData? Object.keys(orderData.orderid,).map(orderId=>
    { 
      return (
            <div className='container'> 
               {/* {console.log("INSIDE COMPONENT>>>",orderData.orderid[orderId])} */}
                <div className='Order'>
                  <div className='order_header'>
                    <div>
                    
               <h2>Order No: {orderData.orderid[orderId]}</h2> 
                      <span className='order-date'>

                     <p><strong>Order placed on</strong></p>
                      <p>{formattedDate}</p> 
                      </span>
                    </div>
                  {checkbox?<p className='gift'>This is a gift</p>:""}
                  {/* {console.log("Inside component>>>",orderData.orderid[orderId],total)} */}
                  <CurrencyFormat 
                    renderText={(value)=>(
                        <div className='currency'>
                       <h4>Order Total:</h4>               
                       <p>{value}</p>
                       </div>
                    )}
                    decimalScale={2}
                    value={totalAmt?totalAmt[orderData.orderid[orderId]]:0}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix='₹'
                  />
                  <div className='order_header_address'>
                    <h4>Ship to</h4>
                    <p>{user}</p>
                  </div>
                </div> 
                {/* orderheader */}
                {/* header finished */}
                <div className='order_container'>
                  {orderData.orderisbns[orderData.orderid[orderId]].map(o=>{
                  return ( <CheckoutBook 
                  key={o[0]} id={o[0]} title={o[1]} image={o[3]} price={o[4]} rating={o[5]}/> )
                  })}
                </div>
              </div>
              
              </div>
          )}
          ):<div>No orders</div>}
    </div>
  )
}
export default OrdersHistory
