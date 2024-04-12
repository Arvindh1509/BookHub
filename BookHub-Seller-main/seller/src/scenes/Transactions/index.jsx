import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Box, colors } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import './index.css'
import AnimatedPage from '../../components/AnimatedPage';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'Buyer Name',
      width: 150,
      editable: false,
    },
    {
        field: 'ordernumber',
        headerName: 'Order Number',
        type: 'number',
        width: 110,
        editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'mode',
      headerName: 'Mode Of Payment',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false
    }
  ];
function Transactions() {

  const [transactions,setTransactions]=useState([]);
  const [{sellerEmail}]=useStateValue();
 
useEffect(()=>{
  fetchTransactions();
},[]);

function fetchTransactions() {
  axios.post('/transSeller',{sellerEmail})
    .then(response => {
      setTransactions(response.data); //   the state with the received data
    })
    .catch(error => {
      console.error('Error fetching books:', error);
    });
}
console.log(transactions);
const rows = transactions.map((item, index) => ({
  id: index + 1,
  firstName: item[0],
  ordernumber: item[3],
  amount: item[1]?item[1]:item[2],
  mode:'Card',
  status: (item[5]==='DISPATCHED'||'dispatched')?'Completed':'Incomplete'
}));
const getRowClassName = (params) => {
return 'green-background'
 
};

  return (
    <AnimatedPage>

    <Box m='1.5rem 2.5rem'>
        <Header title='Transactions'/>
        <Box
        mt="40px"
        height="75vh"
        sx={{
          "&  .MuiDataGrid-virtualScroller": {
            backgroundColor: 'green',
            
          },
        }}
      >
            <DataGrid 
              rows={rows}
            columns={columns} 
            loading={!rows}
            disableRowSelectionOnClick
            getRowClassName={getRowClassName}
            />
        </Box>
    </Box>
    </AnimatedPage>
  )
}

export default Transactions
