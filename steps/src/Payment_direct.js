import React, { useEffect } from 'react'

function Payment_direct() {

  useEffect(()=>{
    checkout();
  },[])

  function checkout(){
    
  }

  return (
    <div>
      <h1> Sample Action</h1>
      <button onClick={checkout}>Stripe Checkout</button>
    </div>
  )
}

export default Payment_direct
