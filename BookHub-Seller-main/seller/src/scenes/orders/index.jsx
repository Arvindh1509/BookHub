import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, colors } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import './index.css'
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';

const columns = [
  {field:'id',headerName:'ID',width:90},
    { 
      field: 'order_id',
      headerName: 'Order ID', 
      width: 90 
    },
    {
      field: 'order_date',
      headerName: 'Date',
      width: 150,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Buyer',
      width: 150,
      editable: false,
    },
    {
      field: 'order_status',
      headerName: 'Status',
      width: 150,
      editable: false,
    }
  ];
  

function Orders() {

const [orders,setOrders]=useState([]);
const [{userEmail}]=useStateValue();
 
useEffect(()=>{
  fetchOrders();
},[]);

function fetchOrders() {
  axios.post('/orderSeller',{userEmail})
    .then(response => {
      setOrders(response.data); //   the state with the received data
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}
console.log(orders);
const rows = orders.map((item, index) => ({
  
  id: index + 1,
  order_id: item[0],
  order_date: item[1],
  email: item[3],
  order_status: item[2]
}));

const getRowClassName = (params) => {
  if(params.row.order_status==='dispatched') return 'green-background' 
  else if(params.row.order_status==='DISPATCHED') return 'green-background'
  else return 'red-background'
  // return params.row.order_status === ('dispatched'||'DISPATCHED') ? 'green-background' : 'red-background';
};
  return (
    <Box m='1.5rem 2.5rem'>
        <Header title='Orders'/>
        <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: '#FD0E0E',
            color: 'white',
            borderBottom: "none",
          },
          "&  .MuiDataGrid-virtualScroller": {
            backgroundColor: 'red',

          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor:'transaparent',
            color:'black',
            border: "1px solid gray",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: 'white',
          },
        }}
      >
            <DataGrid 
              rows={rows}
            columns={columns} 
            loading={!rows}
            getRowClassName={getRowClassName}
            disableRowSelectionOnClick
            />
        </Box>
    </Box>
  )
}

export default Orders
