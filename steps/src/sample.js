const bodyParser = require('body-parser')
const express = require('express')
const OracleDB = require('oracledb')
const oracledb=require('oracledb')
const app = express()
const port = 3000

// const dbconfig={
//     user:'arvindh',
//     password:'arvindh',
//     connectString:'localhost:1521/ORCLPDB'
// }

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json);

app.put('/signin', async(req, res) => {
    const {empno,ename,sal}= req.body;

    try {
        const connection= await OracleDB.getConnection({
            user:'arvindh',
            password:'arvindh',
            connectString:"localhost/ORCLPDB"
        });

        await connection.execute('INSERT INTO EMP(EMPNO,ENAME,SAL) VALUES(:empno,:ename,:sal)',
        {empno,ename,sal});

        await connection.close();

        res.send('user signin completed');
    } catch (error) {
        console.log(error);
        res.send('error signing in');
    }
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))