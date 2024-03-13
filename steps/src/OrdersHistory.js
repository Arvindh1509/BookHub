import React, { useState } from 'react'
import { useStateValue } from './Stateprovider'
import Order from './Order';
import './OrderHistory.css'

function OrdersHistory() {

  const [{basket,order}] = useStateValue(); 
console.log(basket);
  return (
    <div className='orders'>
      <div className='order_title'>
        <h1>Orders History</h1>
        </div>
        {order.length!=0?<Order />:
          <div>No orders </div>
        }
      
    </div>
  )
}

export default OrdersHistory
