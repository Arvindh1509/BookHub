const express = require('express')
const app = express()
const port = 4000
const cors=require('cors')
const OracleDB = require('oracledb');

app.use(cors)
app.use(express.json)
app.use(express.urlencoded({extended:false}))

const dbConfig={
    user:'arvindh',
    password:'arvindh',
    connectString:'localhost/ORCLPDB'
};

// app.get('/insert',(req,res)=>{

//     res.json({message:'hello all'})
//     // try {
//     //     // const connection=await OracleDB.getConnection(dbConfig);
    
//     //     // const { FirstName,LastName , Email ,pwd ,DeliveryAddress ,contactNo }=req.body;
    
//     //     // const result=await connection.execute(`INSERT INTO USERS(FIRSTNAME) VALUES(:FIRSTNAME)`,{FirstName});
    
//     //     // await connection.commit();
//     //     // await connection.close();
//     //     // res.send('Data Added to the DB');

     
    
    
    
//     // } catch (error) {
//     //     res.status(500).send('Error adding data to DB');
//     // }
// })

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => {console.log(`Example app listening on port ${port}!`)
console.log('arvindh');})