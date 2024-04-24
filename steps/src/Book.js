import React, { useEffect, useState } from 'react'
import './Book.css'
import { useStateValue } from './Stateprovider';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Icon, IconButton } from '@mui/material';
import axios from './axios'

function Book({id,title,author,image,price,rating,quantity,category,seller,description}) {

  
  const [{user,userEmail,favArr},dispatch] = useStateValue();
  
  const [favour,setFavour]=useState(false);
  const history=useHistory();
  function favourites(favo){
    
    if(user){
      if(favo)
      {dispatch({
      type:'remove_from_fav',
      id:id
    });
    axios.post('/removefav',{userEmail,id});
  }
    else
   { dispatch({
      type:'add_to_fav',
      id:id,
    });
    axios.post(`/putfav`,{userEmail,id});
  }
  }
    else{
      history.push('/login')
    }
  }

  function addtobasket(){

    dispatch({
      type:'add_to_basket',
      item:{
        key:id,
        id:id,
        title:title,
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
          
          <IconButton className='favIcon' onClick={() => {
            favArr.includes(id)?favourites(true):favourites(false)
            }}>
            {favArr.includes(id) ? (<FavoriteIcon className='fav'/>) : <FavoriteBorderIcon />}
          </IconButton>
              {quantity>=1?<button className="add_to_cart" onClick={addtobasket}>Add to Cart</button>:""}
        
    </div>  
  )
}

export default Book
