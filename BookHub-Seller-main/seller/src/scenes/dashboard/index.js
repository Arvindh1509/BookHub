import React, { useEffect, useState } from 'react'
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { Box } from '@mui/material';
import Statbox from '../../components/Statbox';
import { useStateValue } from '../../StateProvider';
import { Navigate } from 'react-router-dom';
import axios from '../../axios'

function Dashboard() {
  
  const [{seller,sellerEmail}] =useStateValue();
  const [closedOrders,setClosedorders]=useState();
  const [openOrders,setOpenorders]=useState();
  const [totalOrders,setTotalOrders]=useState();

  useEffect(()=>{
    fetchInfo();
  },[])



  function fetchInfo(){
    axios.post('/dashboard_Seller',{sellerEmail})
    .then((data)=>{
      setClosedorders(data.data.closedOrders.rows[0][0]);
      setOpenorders(data.data.openOrders.rows[0][0]);
      setTotalOrders(data.data.total_books.rows[0][0]);
      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  console.log(seller);

  return (seller?<Box m="1.5rem 2.5rem">
    <FlexBetween >
        <Header title={`Welcome ${seller}, Your Dashboard`}/>
    </FlexBetween>
    <Box mt="20px" display={"flex"}
    gap="20px"
   
    >
      <Statbox title={"Total Books"} value={totalOrders}/>
      <Statbox title={"Open Orders"} value={openOrders}/>
      <Statbox title={"Closed Orders"} value={closedOrders}/> 
    </Box> 
  </Box>:<Navigate to={'/loginSeller'} replace={true}/>)

  
}

export default Dashboard
