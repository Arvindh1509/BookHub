import { Box, Typography } from '@mui/material'
import React from 'react'

function Header({title}) {
  return (
    <Box>
        <Typography variant="h2" color={'Black'} fontSize='200%' fontWeight={"bold"} sx={{mb:'5px'}}>
            {title}
        </Typography>
    </Box>
  )
}

export default Header
