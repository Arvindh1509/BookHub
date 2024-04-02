import React, { useState } from "react";
import {
  ArrowDropDownOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton, 
  InputBase, 
  Toolbar,
  Typography,
} from "@mui/material";
import FlexBetween from "./FlexBetween";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";

const Navbar = ({isSidebarOpen, setIsSidebarOpen }) => {

  const [anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl)
  const[{user},dispatch]=useStateValue();
  const navigate=useNavigate();
  
  function handleClick(e){
    return setAnchorEl(e.currentTarget);

  }

  function handleClose(e){
    dispatch({
      type:'logoutSeller'
    })
    navigate("/loginSeller")
    console.log(e);
  }


  return (
    
      <Toolbar sx={{display:'flex', justifyContent: "space-between" , backgroundColor:'red'}} >
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon sx={{color:'white'}}/>
          </IconButton>
          <FlexBetween
            backgroundColor='transparent'
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase sx={{border:'none', borderRadius:'20px', backgroundColor:'white'}} placeholder="Search..." />
            <IconButton>
              <Search sx={{color:'white'}}/>
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
           <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px",color:'white' }} />
          </IconButton>

          <FlexBetween>
          <Button onClick={handleClick} sx={
            {
              display:"flex",
              justifyContent:"space-between",
              alignItems:'center',
              textTransform:"none",
              gap:"1rem"
            }
          }>
          <Box component="img"
                alt='profile'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwXgn0FyiHXZIQZmx-s7A-1ENxosvfoQiydMyBKsRBA&s"
                height={"32px"}
                width="32px"
                borderRadius={"50%"}
                sx={{objectFit:"cover"}} />

                <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "White"}}>
                    {user}
                  </Typography>

                  <ArrowDropDownOutlined sx={{color:'white', fontSize:'25px'}}/>
          </Button>
          <Button onClick={handleClose} sx={{color:'black', backgroundColor:'white'}}>Log Out</Button>
        </FlexBetween>

          </FlexBetween>
     
      </Toolbar>
  );
};

export default Navbar;