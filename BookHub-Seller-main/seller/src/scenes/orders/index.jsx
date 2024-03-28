import React from 'react'
import Header from '../../components/Header'
import { Box, colors } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import './index.css'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: false,
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 110,
      editable: false,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
    {
      field: 'dispatched',
      headerName: 'Status',
      width: 150,
      editable: false,
    }
  ];
  
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14,dispatched:'Dispatched' },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31,dispatched:'Pending' },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31,dispatched:'Dispatched' },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11,dispatched:'Pending' },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null,dispatched:'Dispatched' },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150,dispatched:'Pending' },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44,dispatched:'Dispatched' },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36,dispatched:'Pending' },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65,dispatched:'Dispatched' },
  ];

function Orders() {

  const getRowClassName = (params) => {
    return params.row.dispatched === 'Dispatched' ? 'green-background' : 'red-background';
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
            backgroundColor:'red',
            color:'white',
            borderTop: "none",
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
