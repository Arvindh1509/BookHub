import React from 'react'
import FlexBetween from './FlexBetween'
import { Box, Typography } from '@mui/material'

function Statbox({title,value,increase,icon,description}) {
  return (
   <Box 

   display="flex"
   flexDirection="column"
   justifyContent="space-between"
   height={"150px"}
   p="1.25rem 1rem"
    flex="1 "
    backgroundColor={"red"}
    borderRadius="0.55rem"
   >
   <FlexBetween>
    <Typography variant="h6" sx={{color: "white"}}>
        {title}
    </Typography>
    <Typography variant='h3' fontWeight={"600"} sx={{color:"white"}}>
        {value}
    </Typography>
   </FlexBetween>

   </Box>
  )
}

export default Statbox
