import React, { useEffect, useState } from 'react'
import './Home.css'
import top_image from './images/Top_image_website.jpg';
import Book from './Book';
import axios from './axios';
import AnimatedPage from './AnimatedPage';
import { useStateValue } from './Stateprovider';

function Home({search1}) {

  const [books,setBooks]=useState([]);
  const [backup,setBackup]=useState([]);
  const [{userEmail,favArr},dispatch]=useStateValue();
  console.log(favArr);
  const [{favBook,setFavBook}]=useState([])
// console.log(search1);
useEffect(() => {
  if(userEmail){axios.post('/booksRes',{userEmail})
  .then(data=>{  
    setFavBook(data.data);
    dispatch({
      type:"favArr",
      favArr:favBook
    })
  }).
  catch(err=>console.log(err))
  fetchBooks()}
     else
      fetchBooks();
}, []);

  
  useEffect(()=>{
    if(search1==""){
      setBooks(backup)
    }else{
    let arr = books.filter((data)=>data[1].includes(search1));
    setBooks(arr);
    }
  },[search1])
  
  function fetchBooks() {
    axios.get('/books')
      .then(response => {
        setBooks(response.data); // Update the state with the received data
        setBackup(response.data)
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }

   const default_description="Internationally bestselling author Anthony Horowitz’s third James Bond novel, after Forever and a Day.It is M's funeral. One man is missing from the graveside: the traitor who pulled the trigger and who is now in custody, accused of M's murder—James Bond.  Behind the Iron Curtain, a group of former Smersh agents want to use the British spy in an operation that will change the balance of world power. Bond is smuggled into the lion's den—but whose orders is he following, and will he obey them when the moment of truth arrives? In a mission where treachery is all around and one false move means death, Bond must grapple with the darkest questions about himself. But not even he knows what has happened to the man he used to be.";

// console.log("Books:",books)

  return (
    <AnimatedPage>

    <div className='Home'>
      <div className='home_ad'>
        <img className='top_image' src={top_image}/>
     
      <div className='product_row'>
        {/* <book></book> */}
{/* {console.log(books.length)} */}
{books.length>0 ?
books.map((record,index)=> 

      (
      <Book 
      key={record[0]}
      id={record[0]}
      title={record[1]}
      author={record[2]}
      image={record[3]}
      price={record[4]}
      rating={record[5]}
      quantity={record[6]}
      category={record[7]}
      seller={record[8]}
      description={record[9]?record[9]:default_description}
      
/>  

    )):<div>
      <h1>No results</h1>
    </div>}


      </div>
      </div>
    </div>
    </AnimatedPage>
  )
}

export default Home

