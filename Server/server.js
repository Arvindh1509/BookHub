const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OracleDB = require('oracledb');
const bcrypt=require('bcrypt');
const app = express();
const port = 8000;
const env=require('dotenv');
const stripe=require('stripe')('sk_test_51Os1YBSGWWLum80tqVobh8TE5LCKrPFCdftpDgZ5rBaUn2RQ6YVXELia5xpjgnChIcqincdLubYRMZGSPL359I2y00ECuNJO9F')

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
    console.log(req.body.userEmail);
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
    const cart=await connection.execute(`SELECT ORDER_ID FROM ORDERS WHERE EMAIL=:email`,{Email});
    for (const [index, row] of cart.rows.entries()) {
      orderid[`${index + 1}`] = row[0];
    }
    console.log("-------------->",orderid);
    // console.log(cart.rows);
    
    var orderisbns = {};
    // var total={};
    // var dates={};
    for (const orderIdArr of Object.values(orderid)) {
      const orderId = orderIdArr;
      console.log("inside isbns------------->", orderId);
      const ans = await connection.execute(`SELECT * 
      FROM BOOKS 
      WHERE ISBN IN (SELECT P.ISBN 
                     FROM ORDERS O 
                     JOIN ORDER_ITEMS P ON O.ORDER_ID = P.ORDER_ID 
                     WHERE O.ORDER_ID = :orderid)`, { orderid: orderId });
                     console.log(ans.rows);
      orderisbns[`${orderId}`] = ans.rows; 


      // const date=await connection.execute(`SELECT TOTAL_AMOUNT FROM ORDERS WHERE EMAIL=:email AND ORDER_ID=:orderid `,{email:Email,orderid:orderId})
      // dates[]
    }
    // console.log(orderisbns);

    res.send({orderid,orderisbns});

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
      imageurl:book_details.imageurl,
      price:book_details.price,
      quantity:book_details.quantity,
      rating:book_details.rating,
      userEmail:book_details.userEmail
    };

    const result=await connection.execute(`INSERT INTO BOOKS (ISBN,TITLE,AUTHOR,IMAGEURL,PRICE,RATING,QUANTITY,SELLER_EMAIL) VALUES(
      :isbn,:title,:author,:imageurl,:price,:rating,:quantity,:userEmail) `,binds_book,{autoCommit:true});

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
      const userName=user[2];
      const userEmail=user[0];
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
      total:userDetails.total
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

    const sql2=`INSERT INTO ORDER_ITEMS(ORDER_ID,ISBN,QUANTITY) VALUES(
                  :orderId,:id,10)`
    const binds={
     orderId:details.orderId,
      id:details.id
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

// called from Payment.js and passed with total &
// sends the payment intent and doesnt use db for this
app.post('/payments/create',async(req,res)=>{
    const total=req.query.total;
    console.log(total);
    if(total>0){
    const paymentIntent = await stripe.paymentIntents.create({
      description: 'Software development services',
      shipping: {
        name: 'Jenny Rosen',
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
    });
    res.status(201).send({
      clientSecret :paymentIntent.client_secret, 
      total
    })
    console.log(paymentIntent.client_secret);
  }else{
    // console.log("Cursor is here>>>");
  res.status(201).send("No Orders")}
  })

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

    console.log(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

app.post('/transSeller',async(req,res)=>{
  try {
    const connection = await OracleDB.getConnection(dbConfig);
    const result = await connection.execute(`select u.firstname,o.total_amount,o.order_id,o.order_date,o.order_status,o.email from orders o 
    join order_items p
    on o.order_id=p.order_id
    join books b
    on b.isbn=p.isbn
    join users u
    on o.email=u.email
    where b.seller_email=:userEmail
    order by order_id desc`,{userEmail:req.body.userEmail});

    res.json(result.rows); 

    console.log(result.rows);
  } catch (error) {
    console.error('Error accessing the database:', error);
    res.status(500).send("Error in accessing the table");
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
