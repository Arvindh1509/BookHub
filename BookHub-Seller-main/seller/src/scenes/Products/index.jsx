import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../../axios';

import Header from '../../components/Header'
import { useStateValue } from '../../StateProvider';

const Product=({isbn,title,author,price,rating,quantity})=>{
  const [isExpanded,setIsExpanded]=useState(false)
  return(
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: 'red',
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
        <Box sx={{backgroundColor:'white', borderRadius:'9px'}}>
          <Typography
            sx={{ fontSize: 10, }}
            color='Black'
            gutterBottom
          >
            {"Thriller"}
          </Typography>
          </Box>
          <Typography fontSize={15} color='white' component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: "1.5rem" }} color='white'>
            {author}
          </Typography>
          <Typography sx={{ mb: "1.5rem" }} color='white'>
            {/* ${Number(price).toFixed(2)} */}
            ₹ {price}
          </Typography>
          <Rating value={rating} readOnly />
  
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'See Less': 'See More'}
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{
            color: 'white',
          }}
        >
          <CardContent>
            <Typography>{isbn}</Typography>
            <Typography>{quantity}</Typography>
            
          </CardContent>
        </Collapse>
      </Card>
    );
}


function Products() {

  const [books,setBooks]=useState([]);
  const [{userEmail},dispatch]=useStateValue();
 
  useEffect(()=>{
    fetchBooks();
  },[]);
 
  function fetchBooks() {
    axios.post('/books_seller',{userEmail})
      .then(response => {
        setBooks(response.data);
        dispatch({
          type:'addbooks',
          books:books
        }) // Update the state with the received data
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="List Of Books"/> 
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn:undefined  },
          }}
        >
       {books.length>0 &&
       books.map((record)=>(
        <Product
           key={record[0]}
            isbn={record[0]}
            title={record[1]}
            author={record[2]}
            image={record[3]}
            price={record[4]}
            rating={record[5]}
            quantity={record[6]}

        />
       ))}
       {/* <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        />
        <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        />
        <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        />
        <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        />
        <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        />
        <Product 
          isbn={'12345678990123'}
          title={'James Bond'}
          author={'Ian Flemming'}
          price={'200'}
          rating={5}
          quantity={10}
        /> */}
          
          
        </Box>
    </Box>
  )
}

export default Products
