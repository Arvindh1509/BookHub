import React from 'react'
import './Book.css'
import { useStateValue } from './Stateprovider';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import StarIcon from '@mui/icons-material/Star';

function Book({id,title,author,image,price,rating,quantity,category,seller,description}) {

  const [{basket},dispatch] = useStateValue();

  function addtobasket(){

    dispatch({
      type:'add_to_basket',
      item:{
        key:id,
        id:id,
        title,
        price:price,
        rating:rating,
        image:image,
        description:description
      
      }
    })

  }

  function viewBook(){
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

  return (
    
    <div className='book'>
    
        <div className='book_info'>

          <p>{title} by {author}</p>
          <div className='book_rating'>
            {Array(rating).fill().map((_,i)=>(
              <StarIcon className='star'/>
            ))}   
          </div>
          <div className={quantity<1?'book_quantity_out':'book_quantity_in'}>
          
            <h4>{quantity<1?"OUT OF STOCK":"IN STOCK"}</h4> 
            {/* <p>{quantity}</p> */}
          </div>
          <p className='book_price'>
            <small>Rs</small>
            <strong>{price}</strong>
          </p>
         
        </div>
        <Link to='/Book_seperate'>
          <img className='book_img' src={image} onClick={viewBook}/>
          </Link>
              {quantity>=1?<button className="add_to_cart" onClick={addtobasket}>Add to Cart</button>:""}
        
       
    </div>
  )
}

export default Book
