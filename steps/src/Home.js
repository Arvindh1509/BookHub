import React, { useEffect, useState } from 'react'
import './Home.css'
import top_image from './images/Top_image_website.jpg';
import Book from './Book';
import axios from './axios';

function Home() {

  const [books,setBooks]=useState([]);

  useEffect(()=>{
    fetchBooks();
  },[]);
 
  function fetchBooks() {
    axios.get('/books')
      .then(response => {
        setBooks(response.data); // Update the state with the received data
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }

  const description="Internationally bestselling author Anthony Horowitz’s third James Bond novel, after Forever and a Day.It is M's funeral. One man is missing from the graveside: the traitor who pulled the trigger and who is now in custody, accused of M's murder—James Bond.  Behind the Iron Curtain, a group of former Smersh agents want to use the British spy in an operation that will change the balance of world power. Bond is smuggled into the lion's den—but whose orders is he following, and will he obey them when the moment of truth arrives? In a mission where treachery is all around and one false move means death, Bond must grapple with the darkest questions about himself. But not even he knows what has happened to the man he used to be.";

// console.log("Books:",books)

  return (
    <div className='Home'>
      <div className='home_ad'>
        <img className='top_image' src={top_image}/>
     
      <div className='product_row'>
        {/* <book></book> */}
{/* {console.log(books.length)} */}
{books.length>0 && 
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
      description={description}
/>  

    ))}

    
{/* 
         <Book id={1} title="With a mind to kill: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition" author={"Antony Horowitz"}
          image={'https://www.jamesbondlifestyle.com/sites/default/files/ckeditor/images/news/121215-with-a-mind-to-kill-cover.jpg'}
          price={200} rating={5}
          quantity={10}
          description={description}
        />
        <Book id={2} title="Casino Royale: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition" author={"ian flemming"}
          image={'https://m.media-amazon.com/images/I/41NceAE+NpL._SY445_SX342_.jpg'}
          price={250} rating={4}
          quantity={0}
          description={description}
        />

         
      {/* <div className='product_row'> */}
      {/* <Book id={3} title="Moonraker: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition"
image={'https://m.media-amazon.com/images/I/41tPxOdq0+L._SY445_SX342_.jpg'}
          price={350} rating={4}
          quantity={10}
          description={description}
        />
      <Book id={4} title="Live and let Die: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition"
image={'https://m.media-amazon.com/images/I/71ig4bm5rsL._SL1500_.jpg'}
          price={400} rating={4}
          quantity={10}
          description={description}
        />
      <Book id={5} title="Thunderball: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition"
image={'https://m.media-amazon.com/images/I/41Jwy4IWtCL._SY445_SX342_.jpg'}
          price={450} rating={4}
          quantity={10}
          description={description}
        /> <Book id={5} title="Thunderball: A James Bond Novel Kindle Edition
by Ian Fleming (Author) | Format: Kindle Edition"
image={'https://m.media-amazon.com/images/I/41Jwy4IWtCL._SY445_SX342_.jpg'}
          price={450} rating={4}
          quantity={10}
          description={description}
        />  */} 
     {/* </div> */}
      </div>
      </div>
    </div>
  )
}

export default Home

