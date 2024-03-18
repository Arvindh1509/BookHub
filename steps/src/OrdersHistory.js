import React, { useEffect, useState } from 'react'
import { useStateValue } from './Stateprovider'
import Order from './Order';
import './OrderHistory.css'
import axios from './axios';
import CheckoutBook from './CheckoutBook';

function OrdersHistory() {

  const [{basket,order}] = useStateValue(); 

  const [{userEmail}]= useStateValue();

  useEffect(()=>{
    axios.post('/ordersHistory',{userEmail:userEmail})
    .then((result)=>{
      // console.log("---------------->",result.data);
      const orderId=result.data.orderid;
      const isbns=result.data.orderisbns;
      const length=Object.keys(orderId).length;
      console.log(length);
      const books=[];
      for (let i=1;i<=length;i++){ 
      console.log(orderId[i]+"---------------->");
        let l2=Object.keys(isbns[orderId[i]]).length;
        console.log(l2);
        // console.log(isbns[orderId[i]][0]); 
          
          isbns[orderId[i]].map(item=>{ 
            console.log(item[0]);
          });
          // console.log(isbns[orderId[i]][j]);        
    }
    console.log(books);
    })
  })

// console.log(basket);
  return (
    <div className='orders'>
      <div className='order_title'>
        <h1>Orders History</h1>
        </div>
        
        <h2>Order No</h2>
        {order.length!=0?<Order />:
          <div>No orders </div>
        }
      
    </div>
  )
}

export default OrdersHistory
