import React from 'react'
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { Box, Button } from '@mui/material';
import Statbox from '../../components/Statbox';
import { useStateValue } from '../../StateProvider';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  
  const [{user,books}] =useStateValue();

  console.log(user);

  return (user?<Box m="1.5rem 2.5rem">
    <FlexBetween >
        <Header title="Welcome Arvindh, Dashboard"/>
    </FlexBetween>
    <Box mt="20px" display={"flex"}
    gap="20px"
   
    >
      <Statbox title={"Total Books"} value={20}/>
      <Statbox title={"Open Orders"} value={10}/>
      <Statbox title={"Closed Orders"} value={5}/> 
    </Box> 
  </Box>:<Navigate to={'/loginSeller'} replace={true}/>)

  
}

export default Dashboard
