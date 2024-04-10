const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OracleDB = require('oracledb');
const bcrypt=require('bcrypt');
const app = express();
const port = 8000;
const env=require('dotenv');
// IN Account
const stripe=require('stripe')('sk_test_51Os1YBSGWWLum80tqVobh8TE5LCKrPFCdftpDgZ5rBaUn2RQ6YVXELia5xpjgnChIcqincdLubYRMZGSPL359I2y00ECuNJO9F')
// US Account
// const stripe=require('stripe')('sk_test_51P3djB03iUD21U4gseQbQGzwjinYgzzyyxs3ZEWM6gXELiQKhnwFaziihUbnMsR5ioLvSluXpuemitV5DWjOShNg00fFYXMhmG');

app.use(cors());
env.config();

const dbConfig = {
    user: process.env.DBUSER, 
    password: process.env.DBPASSWORD,
    connectString: process.env.DBSTRING
};
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fetch all the books in the home.js 
app.get('/books', async (req, res) => {
  try {
    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM Books');

    res.json(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
});

app.post('/books_seller',async(req,res)=>{
  try {
    // console.log(req.body.userEmail);
    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute('SELECT * FROM Books where seller_email=:userEmail',{ userEmail: req.body.userEmail },{autoCommit:true});

    res.json(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

// called from ordersHistory.js by passing email
// uses orders table and order_items table and
//  sends orderid and order_isbns
app.post('/ordersHistory',async(req,res)=>{
  try {
    let Email=req.body.userEmail;

    const connection = await OracleDB.getConnection(dbConfig);
    let orderid={};
    let totalAmt={};
    let order_date={};
    const cart=await connection.execute(`SELECT  ORDER_ID,total_amount,ORDER_DATE FROM ORDERS WHERE EMAIL=:email
    order by order_id desc`,{Email});
    for (const [index, row] of cart.rows.entries()) {
      orderid[`${index + 1}`] = row[0];
      console.log(row[1]);
      totalAmt[`${index + 1}`] = row[1];
      order_date[`${index+1}`]=row[2];
    }
   
    
    var orderisbns = {};
    
    for (const orderIdArr of Object.values(orderid)) {
      const orderId = orderIdArr;
  
      const ans = await connection.execute(`SELECT * 
      FROM BOOKS 
      WHERE ISBN IN (SELECT P.ISBN 
                     FROM ORDERS O 
                     JOIN ORDER_ITEMS P ON O.ORDER_ID = P.ORDER_ID 
                     WHERE O.ORDER_ID = :orderid)`, { orderid: orderId });
                  
      orderisbns[`${orderId}`] = ans.rows; 

      


     
    }
    

    res.send({orderid,orderisbns,totalAmt,order_date});

  } catch (error) {
    console.log(error); 
    res.send(error);
    
  }
}) 

// why is it here?? 
// app.post('/ordersample', async(req,res)=>{

//   const details=req.body.email;
//   const connection=OracleDB.getConnection(dbConfig);

//   var ans;
//   details.map(item=>{
//    try{ ans= connection.execute(`SELECT P.ISBN FROM ORDERS O JOIN ORDER_ITEMS P
//                             ON O.ORDER_ID = P.ORDER_ID WHERE O.ORDER_ID = :orderId`, { orderId: item })
//     console.log(ans.rows);}
//     catch(err){
//       console.log(err);
//     }
//   })
// })


// used for inserting books through thunder
app.post('/book_insert',async(req,res)=>{
  const book_details=req.body;
  try {
    const connection=await OracleDB.getConnection(dbConfig);
    const binds_book={
      isbn:book_details.isbn,
      title:book_details.title,
      author:book_details.author,
      imageurl:book_details.img,
      price:book_details.price,
      quantity:book_details.quantity,
      rating:book_details.rating,
      userEmail:book_details.userEmail,
      category:book_details.category,
      description:book_details.description
    };

    const result=await connection.execute(`INSERT INTO BOOKS (ISBN,TITLE,AUTHOR,IMAGEURL,PRICE,RATING,QUANTITY,SELLER_EMAIL,CATEGORY,DESCRIPTION) VALUES(
      :isbn,:title,:author,:imageurl,:price,:rating,:quantity,:userEmail,:category,:description) `,binds_book,{autoCommit:true});

      await connection.close();

      res.send("data sent succ");
      console.log("data added to DB");

  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

// from Register.js component and passes
// FirstName,lastName,email,pwd,deliveryaddress,contactno
// and uses USERS table in db
const saltRounds=5;
app.post('/register', async (req, res) => {
    const userDetails = req.body;
    try {
        const connection = await OracleDB.getConnection(dbConfig);
        const checkResult= await connection.execute(`select * from users where email=:email`,[req.body.email]);

        if(checkResult.rows.length>0){
            console.log("Account with this email already exists!");
            res.status(500).send("Account with this email already exists!")
        }else{
            const Expassword=req.body.pwd;
            bcrypt.hash(Expassword,saltRounds,async (err,hash)=>{
                if(err){
                    console.log("error in hashing",err);
                }else{
                const sampleSql=`INSERT INTO USERS(FIRSTNAME,LASTNAME,EMAIL,PWD,DELIVERYADDRESS,CONTACTNO)
                VALUES(:firstName,:lastName,:email,:pwd,:deliveryaddress,:contactno)`

                const binds2={
                    firstName:userDetails.FirstName,
                    lastName:userDetails.lastName,
                    email:userDetails.email,
                    pwd:hash,
                    deliveryaddress:userDetails.deliveryaddress,
                    contactno:userDetails.contactno
                }
    
                const result = await connection.execute(sampleSql, binds2, { autoCommit: true });
    
                await connection.close(); 
    
                console.log('Data saved successfully:', result);
                res.send("Data inserted successfully!");
            }
            })}       
    } catch (error) {
        console.error('Error inserting data:', error.message); 
        res.status(500).send('Error inserting data: ' + error.message);
    }
});

// Registration form of the seller and hashing the password and storing 
// in the database
app.post('/registerSeller',async(req,res)=>{const userDetails = req.body;
  try {
      const connection = await OracleDB.getConnection(dbConfig);
      const checkResult= await connection.execute(`select * from seller where email=:email`,[req.body.email]);

      if(checkResult.rows.length>0){
          console.log("Account with this email already exists!");
          res.status(500).send("Account with this email already exists!")
      }else{
          const Expassword=req.body.pwd;
          bcrypt.hash(Expassword,saltRounds,async (err,hash)=>{
              if(err){
                  console.log("error in hashing",err);
              }else{
              const sampleSql=`INSERT INTO SELLER(EMAIL,PWD,COMPANY_NAME,ADDRESS,CONTACT)
              VALUES(:email,:pwd,:company,:companyaddress,:contactno)`

              const binds2={
                  company:userDetails.company,
                  email:userDetails.email,
                  pwd:hash,
                  companyaddress:userDetails.companyaddress,
                  contactno:userDetails.contactno
              }
  
              const result = await connection.execute(sampleSql, binds2, { autoCommit: true });
  
              await connection.close(); 
  
              console.log('Data saved successfully:', result);
              res.send("Data inserted successfully!");
          }
          })}       
  } catch (error) {
      console.error('Error inserting data:', error.message); 
      res.status(500).send('Error inserting data: ' + error.message);
  }
})

// From login.js component and passes email and password 
// uses USERS table
app.post('/login', async (req, res) => {
    try {
      const userDetails=req.body;
  
      const connection = await OracleDB.getConnection(dbConfig);

      const checkResult=await connection.execute(`SELECT * FROM USERS WHERE EMAIL=:email`,[userDetails.email]);  
      if(checkResult.rows.length>0){
        // console.log(checkResult.rows);
        const user=checkResult.rows[0];
        // console.log(user);
        const storedPassword=user[3];
        console.log(storedPassword);
        const userName=user[0];
        const userEmail=user[2];
        const userAddress=user[4];
        // console.log(userAddress);
        const binds={
            email:userDetails.email,
            password:userDetails.password
        }
        bcrypt.compare(binds.password,storedPassword,(err,result)=>{
          if(err){
            console.log("error in comparison during login");
          }
          else{
           if(result)
           { res.send({userName,userAddress,userEmail});
           
          // console.log(userName);
        }

          else
          res.status(500).send("Wrong Password");
          }
        })
      }
      else{
        res.status(500).send("User Not Found");
      }
    } catch (error) {
      res.send(error);
    }
  });

// Login of the seller with the authentication with 5 rounds of salting
app.post('/loginSeller',async(req,res)=>{
  try {
    const userDetails=req.body;

    const connection = await OracleDB.getConnection(dbConfig);

    // const cart=await connection.execute( `select * from `)

    const checkResult=await connection.execute(`SELECT * FROM SELLER WHERE EMAIL=:email`,[userDetails.email]);  
    if(checkResult.rows.length>0){
      // console.log(checkResult.rows);
      const user=checkResult.rows[0];
      // console.log(user);
      const storedPassword=user[1];
      // console.log(storedPassword);
      const userEmail=user[0];

      const userName=user[2];
      
      const userAddress=user[3];
      const userContact=user[4];
      
      // console.log(userAddress);
      const binds={
          email:userDetails.email,
          password:userDetails.password
      }
      bcrypt.compare(binds.password,storedPassword,(err,result)=>{
        if(err){
          console.log("error in comparison during login");
        }
        else{
         if(result)
         { res.send({userName,userAddress,userEmail,userContact});
         
        // console.log(userName);
      }

        else
        res.status(500).send("Wrong Password");
        }
      })
    }
    else{
      res.status(500).send("User Not Found");
    }
  } catch (error) {
    res.send(error);
  }
})

// called from payment.js for placing orders with  only email and orderid
// uses only orders and sends order number
app.post('/order_placing',async(req,res)=>{
  
  try {
    const userDetails=req.body;
    
    const connection= await OracleDB.getConnection(dbConfig);
    const sql1=`INSERT INTO ORDERS(ORDER_ID,EMAIL,TOTAL_AMOUNT,ORDER_DATE,ORDER_STATUS) VALUES(
                  S2.nextval,:userEmail,:total,SYSDATE,'DISPATCHED') `
 
    const binds={
      userEmail:userDetails.userEmail, //SQL1
      total:userDetails.total/100
      
    }


    // console.log("Inside Server",binds.total);


    await connection.execute(sql1,binds,{autoCommit:true});

    console.log("Inside Server",binds.total);

    const result =await connection.execute(`SELECT S2.CURRVAL FROM DUAL`);
    
    // console.log("InsideServer",binds.orderId);

    // await connection.execute(sql2,{ id: userDetails.id },{autoCommit:true});

    await connection.close();

    console.log("order saved successfully in orders");
    console.log(result.rows[0][0]);
    res.send(result.rows[0])
    
    // res.send("Order inserted successfully!");
    

    
  } catch (error) {
    console.log(error);
    res.send("Error")
  }
})  

// called from payment.js for placing eachitem in the order with oid and isbn
// uses order_items table
app.post('/order_items_placing',async(req,res)=>{
  try {
    const details=req.body;
    
    const connection= await OracleDB.getConnection(dbConfig);

    const sql2=`INSERT INTO ORDER_ITEMS(ORDER_ID,ISBN,QUANTITY,PRICE) VALUES(
                  :orderId,:id,:quantity,:price)`
    const binds={
     orderId:details.orderId,
      id:details.id,
      quantity:(details.quantity)?details.quantity:1,
      price:details.price
    }
    console.log(binds.orderId);
    console.log("Inside Server",binds.id)
    await connection.execute(sql2,binds,{autoCommit:true});
    
    await connection.close();

    console.log("order saved successfully in order_items"); 
    res.send("Order inserted successfully!");
    

    
  } catch (error) {
    console.log(error);
    res.send("Error")
  }
})  

// Calling the Dashboard home page with the total books providing
// and 
app.post('/dashboard_Seller',async(req,res)=>{
  try {
    const email=req.body.userEmail;

    const connection = await OracleDB.getConnection(dbConfig);

    const total_books = await connection.execute(`SELECT COUNT(*) FROM Books
     where SELLER_EMAIL=:email`,{email});

    const closedOrders= await connection.execute(`SELECT COUNT(*) 
    FROM (
        SELECT u.firstname,o.total_amount,o.order_id,o.order_date,o.order_status,o.email 
        FROM orders o JOIN order_items p ON o.order_id = p.order_id 
        JOIN books b ON b.isbn = p.isbn JOIN users u ON o.email = u.email 
        WHERE b.seller_email = :email and o.order_status='DISPATCHED' ORDER BY o.order_id DESC
        )`,{email});

    const openOrders= await connection.execute(`SELECT COUNT(*) 
    FROM (
        SELECT u.firstname,o.total_amount,o.order_id,o.order_date,o.order_status,o.email FROM orders o 
        JOIN order_items p ON o.order_id = p.order_id JOIN books b ON b.isbn = p.isbn 
        JOIN users u ON o.email = u.email WHERE b.seller_email = :email and o.order_status='PENDING'
        ORDER BY o.order_id DESC
         )`,{email});

    res.send({total_books,openOrders,closedOrders});
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

// called from Payment.js and passed with total &
// sends the payment intent and doesnt use db for this
app.post('/payments/create',async(req,res)=>{
    const total=req.query.total;
    console.log(total);
    if(total>0){
    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Software development services',
      shipping: {
        name: 'Arvindh Lakshman',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      amount: req.query.total,
      currency: 'inr',
      automatic_payment_methods:{
        enabled:true
      },
      // transfer_data:{
      //   destination:'acct_1P3GxML8RebpoVVG'
      // },
    },
    // {
    //   stripeAccount: 'acct_1P3GZ2SA9vNlWa91',
    //   }
    );
    
    res.status(201).send({
      clientSecret :paymentIntent.client_secret, 
      total
    })
    console.log(paymentIntent.client_secret);
  }else{
    // console.log("Cursor is here>>>");
  res.status(201).send("No Orders")}
  })

app.get ('/paymenttransfer',async(req,res)=>{

  const transfer = await stripe.transfers.create({
    amount: 400,
    currency: 'inr',
    destination: 'acct_1P3dpx07unYcKjng',
    transfer_group: 'ORDER_95',
  });

 
  console.log('Payment and transfer completed successfully:', transfer);
  res.send('SUCCESS>>>>>')
});


app.get('/payment_create',async(req,res)=>{
  const account = await stripe.accounts.create({
    type: 'standard',
    country: 'US',
    email: 'makro@gmail.com',
    
  }); 

  res.send(account)
})

// the orders taken/placed to the seller from the buyer through the book
//  store platform
app.post('/orderSeller',async(req,res)=>{
  try {
    
    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute(`select o.order_id,o.order_date,o.order_status,o.email,b.title from orders o 
    join order_items p
    on o.order_id=p.order_id
    join books b
    on b.isbn=p.isbn
    where b.seller_email=:userEmail
    order by order_id desc`,{userEmail:req.body.userEmail});

    res.json(result.rows);

    // console.log(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

//to show all the respective transactions of the sellers with the 
//particular prices to the seller from the whole transaction of an order 
app.post('/transSeller',async(req,res)=>{
  try {
    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute(`select u.firstname,p.price,o.total_amount,o.order_id,o.order_date,o.order_status,o.email from orders o 
    join order_items p
    on o.order_id=p.order_id
    join books b
    on b.isbn=p.isbn
    join users u
    on o.email=u.email
    where b.seller_email=:userEmail
    order by order_id desc`,{userEmail:req.body.userEmail});

    res.json(result.rows); 

    // console.log(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

//Edit the Attributes in the seller profile and attached to DB
app.post('/editSeller',async(req,res)=>{
  try {
    const userDetails=req.body;
    console.log(userDetails);
    const binds={
      company_name:userDetails.name,
      address:userDetails.address,
      contact:userDetails.contact,
      email:userDetails.userEmail
    }

    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute(`update seller
    set COMPANY_NAME=:company_name,ADDRESS=:address,CONTACT=:contact
    where email=:email`,binds,{autoCommit:true});

    console.log("Data Updated Successfully");
    res.send("Data  Updated Successfully")

  } catch (error) {
    console.log(error);
  }
})

// Edit the Price of a particular book and push it into the database
app.post('/edit_price',async(req,res)=>{
  try {
    const userDetails=req.body;
    console.log(userDetails.current_isbn);
    const binds={
      newprice:userDetails.eprice,
      email:userDetails.userEmail,
      isbn:userDetails.current_isbn 
    }

    const connection=await OracleDB.getConnection(dbConfig);
    const result=await connection.execute(`UPDATE books
    SET price = :newprice
    WHERE seller_email = :email
    AND isbn = :isbn`,binds,{autoCommit:true});

    console.log("price updated successfully");
    res.send("price updated successfully");
  } catch (error) {
    console.log(error);
  }
})

// Edit the Quantity of a particular book and push it into the database
app.post('/edit_quantity',async(req,res)=>{
  try {
    const userDetails=req.body;
    console.log(userDetails.current_isbn);
    const binds={
      newquantity:userDetails.equantity,
      email:userDetails.userEmail,
      isbn:userDetails.current_isbn 
    }

    const connection=await OracleDB.getConnection(dbConfig);
    const result=await connection.execute(`UPDATE books
    SET quantity = :newquantity
    WHERE seller_email = :email
    AND isbn = :isbn`,binds,{autoCommit:true});

    console.log("quantity updated successfully");
    res.send("quantity updated successfully");
  } catch (error) {
    console.log(error);
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});


// Trigger:
// CREATE OR REPLACE TRIGGER after_insert
// AFTER INSERT ON order_items
// FOR EACH ROW
// DECLARE
//     book_quantity books.quantity%TYPE;
// BEGIN
//     SELECT quantity INTO book_quantity FROM books WHERE isbn = :NEW.isbn;
    
//     UPDATE books SET quantity = book_quantity - :NEW.quantity WHERE isbn = :NEW.isbn;
// END;