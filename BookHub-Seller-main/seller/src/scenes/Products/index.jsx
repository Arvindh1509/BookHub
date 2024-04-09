import { Box, Button, Card, CardActions, CardContent, Collapse, Rating, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from '../../axios';
import './index.css'
import Header from '../../components/Header'
import { useStateValue } from '../../StateProvider';

const Product=({isbn,title,author,price,rating,quantity,category})=>{
  const [isExpanded,setIsExpanded]=useState(false);
  const [editP,setEditP]=useState(false);
  const [editQ,setEditQ]=useState(false);
  const [eprice,setEprice]=useState(price);
  const [equantity,setEquantity]=useState(quantity);

  const [{userEmail,current_isbn},dispatch]=useStateValue();

 

  function createQuantity(){
    dispatch({
      type:'editQuantity',
      isbn:isbn
    })
  }

  function handleQuantity(){
    // createQuantity();
    axios.post('/edit_quantity',{equantity,userEmail,current_isbn})
    // clearQuantity();
  }

  function clearQuantity(){
    dispatch({
      type:'clearQuantity',
      isbn:null
    })
  }

  function createPrice(){
    dispatch({
      type:'editPrice',
      isbn:isbn
    })
  }
 

  function handlePrice(){
    // createPrice();
    axios.post('/edit_price',{eprice,userEmail,current_isbn})
    // clearPrice();
  }

  function clearPrice(){
    dispatch({
      type:'clearPrice',
      isbn:null
    })
  }
  return(
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: 'red',
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
        <Box sx={{backgroundColor:'white', borderRadius:'9px', width:'30%',ml:'12vh'}} alignItems={'center'}>
          <Typography
            sx={{ fontSize: 10, paddingLeft:'25%' }}
            color='Black'
            gutterBottom
          >
            {category}
          </Typography>
          </Box>
          <Typography fontSize={15} color='white' component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: "1.5rem" }} color='white'>
            {author}
          </Typography>
          <Typography sx={{ mb: "1.5rem", mr:"0rem", display:'flex',justifyContent:'space-between', alignItems:'center'}} color='white'>
            {/* ${Number(price).toFixed(2)} */}
            <p>₹ <span><input className='price_input' value={eprice} disabled={editP==false?true:false}
            onChange={(e)=>setEprice(e.target.value)}></input> </span></p>
            {editP==true?<Button  sx={{
    backgroundColor: 'white',
    color: 'black', 
    height:'4vh',
    width:'25vw'
  }} onClick={()=>{setEditP(!editP)
 
  handlePrice();}}>Save Price</Button>:
  <Button  sx={{
    backgroundColor: 'white',
    color: 'black', 
    height:'4vh',
    width:'25vw',
    ml:'4vh'
  }} onClick={()=>{setEditP(!editP)
    createPrice();}}>Edit Price</Button>}

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
            <Typography >
            <p>ISBN: <span>{isbn}</span></p>
            </Typography>
            <Typography sx={{ mb: "1.5rem", mr:"0rem", display:'flex',justifyContent:'space-between', alignItems:'center'}}>
            <p>Quantity: <span><input className="price_input" value={equantity} disabled={editQ==false?true:false}
              onChange={(e)=>setEquantity(e.target.value)}
            /></span></p>
            {editQ==true?<Button  sx={{
                backgroundColor: 'white',
                color: 'black', 
                height:'4vh',
                width:'45vw',
                mr:'3vh'
              }} onClick={()=>{setEditQ(!editQ)
              
              handleQuantity();}}>Save Quantity</Button>:
              <Button  sx={{
                backgroundColor: 'white',
                color: 'black', 
                height:'4vh',
                width:'35vw',
                mr:'4vh'
              }}  onClick={()=>{setEditQ(!editQ)
                createQuantity();}}>Edit Quantity</Button>}
            </Typography>
            
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
            category={record[7]}

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
