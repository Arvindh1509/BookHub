  import React from 'react'
  import './Header.css'
  import SearchIcon from '@mui/icons-material/Search';
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
  import { Link,useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useStateValue } from './Stateprovider';
import { useState } from 'react';
import AnimatedPage from './AnimatedPage';
import { Avatar } from '@mui/material';
import {ArrowDropDownOutlined } from "@mui/icons-material";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
  
  function Header({searchChange}) {
    const [searchValue,setSearchValue] =useState('');
    const [{basket,user},dispatch]=useStateValue();
    const history=useHistory();

    function handleSigning(){
        history.push('/login');
    }

    function handleOrders(){
        history.push('/OrdersHistory');        
    }

    function handleSignOut(){
        history.push('/login')
        dispatch({
            type:'logout'
        })
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    // function handleSeller(){
    //     history.push('http://localhost:4000/loginSeller')
    // }

    return (
        <AnimatedPage>

      <div className='Header'>
        <img className='header_logo' src='https://allsaintsvaschool.org/wp-content/uploads/2020/08/BookHub-logo.jpg' onClick={()=>{searchValue?searchChange(''):history.push('/')
        setSearchValue('')}}/>
        <div className='searchContainer'>
        <form onSubmit={(e)=>{
        e.preventDefault();
        console.log(searchValue)
        searchChange(searchValue)
        }}>
            <input className='searchBox' value={searchValue} type='text' onChange={(e)=>setSearchValue(e.target.value)}></input>
        </form>
            <SearchIcon className='search_icon'/>
        </div>
        <div className='header_nav'>
        
            <div onClick={user?handleSignOut:handleSigning} className='header_Options'>
                <span className='header_lineone'>
                    Hello {user?user:"guest"}
                </span>
                <span className='header_linetwo'>
                    {user?"Sign Out":"Sign In"}
                </span>
            </div>
            
            {/* <Link to='http://localhost:4000/loginSeller'> */}
            <div className='header_Options'>
            <span className='header_lineone'>
                    Be a
                </span>
                <span className='header_linetwo_Seller'>
                    Seller !
                </span>
            </div>
            {/* </Link> */}
            <div >
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width:'90%'}} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{handleClose(); history.push('/Profile')} }>Profile</MenuItem>
        <MenuItem onClick={()=>{handleClose(); history.push('/Favourites')}}>Favourites</MenuItem>
        <MenuItem onClick={()=>{handleClose(); user?handleOrders():handleSigning()}}>Returns and Orders</MenuItem>
      </Menu>
    </div>
            {/* <div className='header_Options' onClick={user?handleOrders:handleSigning}>
            <span className='header_lineone'>
                    Returns &
                </span>
                <span className='header_linetwo'>
                    Orders
                </span>
            </div> */}

            <Link to ='/checkout'>
            <div className='cart'>
                <ShoppingCartIcon />
                <span className='header_linetwo cart_count'>{basket?.length}</span>
            </div>
            </Link>
        </div>
      </div>
        </AnimatedPage>
    )
  }
  
  export default Header
  