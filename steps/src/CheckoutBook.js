import React from 'react'
import './CheckoutBook.css'
import { useStateValue } from './Stateprovider'
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function CheckoutBook({id,title,image,price,rating,description,hidebutton}) {
const[{basket},dispatch]=useStateValue();
    function removefromCart(){
        (dispatch({
            type:'remove_item',
            payload:id
        }))
    }
    
    function viewbook(){
      dispatch({
        type:'viewBook',
        item:{
          id:id,
          title,
          price:price,
          rating:rating,
          image:image,
          description:description
        }
      })
    }
  return (
    
    <div className='checkout_book'>
    {/* {console.log("inside checoutbookpage>>",image,title,price,rating)} */}
    <Link to='/Book_seperate'>
     <img className='checkout_book_img' src={image} onClick={viewbook}/>
</Link>
     <div className='checkout_book_info'>
        <p className='checkout_book_title '>{title}</p>
        <div className='checkout_book_rating'>
        {Array(rating).fill().map((_,i)=>(
              <StarIcon key={i} className='star'/>
            ))}  
        </div>
        <p className='checkout_book_price'>
            <small>Rs </small>
            <strong>{price}</strong>
        </p>
        {
          hidebutton && (
            <button onClick={removefromCart}>Remove from the basket</button>
          )
        }
        
     </div>

    </div>
  )
}

export default CheckoutBook
