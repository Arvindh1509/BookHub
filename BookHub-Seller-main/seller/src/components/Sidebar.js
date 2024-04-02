import React from "react";
import './Sidebar.css'
import {  Box,  Divider,  Drawer,  IconButton,  List,  ListItem,  ListItemButton,  ListItemIcon,  ListItemText, Typography,} from "@mui/material";
import {  ChevronLeft,  ChevronRightOutlined,  HomeOutlined,  ShoppingCartOutlined,  ReceiptLongOutlined,    AdminPanelSettingsOutlined,  AddCircleOutlineOutlined,  LoyaltyOutlined, SettingsOutlined,} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useStateValue } from "../StateProvider";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text:"Add a Book",
    icon:<AddCircleOutlineOutlined/>
  },
  
  {
    text: "Books",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Orders",
    icon: <LoyaltyOutlined/>,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  
  {
    text: "Your Profile",
    icon: <AdminPanelSettingsOutlined />,
  },
 
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [{user}]=useStateValue();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: 'transparent',
              backgroundColor: 'red',
              boxSixing: "border-box",
              borderWidth: "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="0.5rem 2rem 1.25rem 2rem">
            <FlexBetween color='red'>
              <Box display='flex'
                   flexDirection='column' 
                   alignItems="center"
                   gap="0.5rem"  >
                  <img src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg' alt='hi' className='image'/>
              </Box>
                {(
                  <IconButton  onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
               
                const lcText =(text==='Add a Book')?'addabook':text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? 'white'
                            : "transparent",
                        color:
                          active === lcText
                            ? 'black'
                            : 'White',
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? 'black'
                              :'White',
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

             <Box position="absolute" bottom={"2rem"}>
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                <Box component="img"
                alt='profile'
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzwXgn0FyiHXZIQZmx-s7A-1ENxosvfoQiydMyBKsRBA&s"
                height={"40px"}
                width="40px"
                borderRadius={"50%"}
                sx={{objectFit:"cover"}} />

                <Box textAlign="left">
                  <Typography fontWeight={"bold"} fontSize={"0.9rem"}
                  sx={{color: "White"}}>
                    {user}
                  </Typography>
                </Box>
                <SettingsOutlined sx={{color:"white", fontSize:"25px"}}/>
         
             </FlexBetween>
              </Box> 
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;