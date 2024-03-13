import React, { useState } from 'react'
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './Stateprovider';
import { getBasketTotal } from './Reducer';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Subtotal() {
    const [{basket,user},dispatch]=useStateValue();
    const history=useHistory();
    const [checkbox,setCheckbox]=useState(true);
console.log(checkbox);
    function handleCheckbox(){
      dispatch({
        type:'checkbox',
        checkbox:checkbox
      })
    }

    function handleSigning(){
      history.push('/login');
  }

  function handleCheckout(){
      history.push('/Payment');
  }

  return (
    <div className='subtotal'>
      <CurrencyFormat 
        renderText={(value)=>(
            <>
              <small className='subtotal_gift'>
                    <input type="checkbox" onChange={()=>{handleCheckbox();setCheckbox(!checkbox);}}/> This Order Contains a gift.
                </small>

                <p>Subtotal ({basket.length} items): <strong>{value}</strong></p>

                
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket,checkbox)}
        displayType={'text'}
        thousandSeparator={true}
        prefix='₹'
      />

      <div className='subtotal_button'>
        <button onClick={user?handleCheckout:handleSigning}>Proceed to checkout </button>
      </div>
    </div>
  )
}

export default Subtotal
