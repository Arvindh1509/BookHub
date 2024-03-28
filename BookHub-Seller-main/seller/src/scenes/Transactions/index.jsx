import React from 'react'
import Header from '../../components/Header'
import { Box, colors } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

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
      field: 'age',
      headerName: 'Amount',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Mode Of Payment',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160
    },
    {
      field: 'dispatched',
      headerName: 'Status',
      width: 150,
      editable: false,
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon',ordernumber:1, age: 2000,fullName:'Card',dispatched:'Completed' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei',ordernumber:2, age: 3100,fullName:'Card',dispatched:'Completed' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime',ordernumber:3, age: 3123,fullName:'Card',dispatched:'Completed' },
    { id: 4, lastName: 'Stark', firstName: 'Arya',ordernumber:4, age: 1111,fullName:'Card',dispatched:'Completed' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys',ordernumber:5, age: 1000,fullName:'Card',dispatched:'Completed' },
    { id: 6, lastName: 'Melisandre', firstName: 'Melisandre',ordernumber:6, age: 1502,fullName:'Card',dispatched:'Completed' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara',ordernumber:7, age: 4490,fullName:'Card',dispatched:'Completed' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini',ordernumber:8, age: 3600,fullName:'Card',dispatched:'Completed' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey',ordernumber:9, age: 6095,fullName:'Card',dispatched:'Completed' },
  ];

function Transactions() {

  

  return (
    <Box m='1.5rem 2.5rem'>
        <Header title='Transactions'/>
        <Box
        mt="40px"
        height="75vh"
        
      >
            <DataGrid 
              rows={rows}
            columns={columns} 
            loading={!rows}
            disableRowSelectionOnClick
            />
        </Box>
    </Box>
  )
}

export default Transactions
