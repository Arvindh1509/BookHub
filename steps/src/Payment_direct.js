import React, { useEffect, useState } from 'react'

function Payment_direct() {

  const [amount,setAmount]=useState(0);


  function checkout(e){
    e.preventDefault();
    if(amount==0){
      alert("please enter amount");
    }else{
      var options={
        key:"rzp_test_sd095naLU4rfSS",
        key_secret:"yL6GOwd56hVBBZIGvvwNPVs8",
        amount:amount*100,
        currency:"INR",
        name:"Projects",
        description:"for sample testing",
        handler:function(response){
          alert(response.razorpay_payment_id);
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

  return (
    <div>
      <h1> Sample Action</h1>
      <input onChange={(e)=>setAmount(e.target.value)} value={amount}></input>
      <button onClick={checkout}>RazorPay Checkout</button>
    </div>
  )
}

export default Payment_direct
