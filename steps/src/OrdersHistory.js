import React, { useEffect, useState } from 'react'
import { useStateValue } from './Stateprovider'
import './OrderHistory.css'
import axios from './axios';
import CheckoutBook from './CheckoutBook';
import CurrencyFormat from 'react-currency-format';
import './Order.css';
import AnimatedPage from './AnimatedPage';

function OrdersHistory() {

  const [{checkbox,user,userEmail}]=useStateValue();
 const [orderData,setOrderData]=useState(null);
 
  useEffect(()=>{ 
    axios.post('/ordersHistory',{userEmail:userEmail})
    .then((result)=>{
      const data=result.data;
      
      console.log(checkbox);
      
      setOrderData(data);
      orderData.orderisbns==null?console.log("Orderdata>>>>>>NULL"):console.log("Orderdata")
    })
    .catch(error=>{
      console.log("error:",error);  
    }) 

    
  },[]); 

const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1; 
const year = today.getFullYear();
const formattedDate = `${day}-${month}-${year}`;

return (
  <AnimatedPage>

  <div className='orders'>
    <div className='order_title'>
      <h1>Orders History</h1>          
    </div>  {console.log(orderData)}
    {
      orderData? Object.keys(orderData.orderid,).map(orderId=>
    { 
      return (
            <div className='container'> 
              
                <div className='Order'>
                  <div className='order_header'>
                    <div>
                    
                      <h2>Order No: {orderData.orderid[orderId]}</h2> 
                      <span className='order-date'>

                     <p><strong>Order placed on</strong></p>
                     {
                          (() => {
                            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                            const date = new Date(orderData.order_date[orderId]);
                            const formattedDate = date.toLocaleDateString('en-GB', options);
                            return (
                              <p>{formattedDate}</p> 
                            );
                          })()
                        }
                      </span>
                    </div>
                    {checkbox?<p className='gift'>This is a gift</p>:""}
                 
                    <CurrencyFormat 
                    renderText={(value)=>(
                        <div className='currency'>
                       <h4>Order Total:</h4>               
                       <p>{value}</p>
                       </div>
                    )}
                    decimalScale={2}
                    value={orderData.totalAmt[orderId]}
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
                <button className='btn_review'>Review the Book!</button>
              </div>
              
              </div>
          )}
          ):<div>No orders</div>}
    </div>
  </AnimatedPage>
  )
}
export default OrdersHistory
