import React from 'react'
import './CheckoutBook.css'
import { useStateValue } from './Stateprovider'
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import AnimatedPage from './AnimatedPage';
import axios from './axios';

function CheckoutBook({id,favour,title,image,price,rating,description,hidebutton,quantity,category,seller}) {
const[{viewedBook,userEmail,basket},dispatch]=useStateValue();
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
          key:id,
          id:id,
          title,
          price:price,
          rating:rating,
          image:image,
          category:category,
          seller:seller,
          description:description,
          quantity:quantity
        }
      })
    }

    function remove_from_fav(){
      dispatch({
        type:'remove_from_fav',
        id:id
      });
      axios.post('/removefav',{userEmail,id});
    }
  return (
    <AnimatedPage>

    <div className='checkout_book'>
    {/* {console.log("inside checoutbookpage>>",image,title,price,rating)} */}
    <Link to='/Book_seperate'>
     <img className='checkout_book_img' src={image} onClick={viewbook}/>
     {console.log(viewedBook)}
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
            {favour?"":<h4>Quantity: {quantity}</h4>}
        </p>
        {
          hidebutton && (
            <button onClick={removefromCart}>Remove from the basket</button>
          )
        }
        {
          favour && (
            <button onClick={remove_from_fav}>Remove from Wishlist</button>
          )
        }
        
     </div>

    </div>
    </AnimatedPage>
  )
}

export default CheckoutBook
