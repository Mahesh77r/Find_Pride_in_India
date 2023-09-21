import React, { useState } from 'react'
import DataTable from 'react-data-table-component';

function Table() {
  const columns =[
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true
    },
    {
        name: 'Age',
        selector: row => row.age,
        sortable: true
    },

  ];
  const data = [
    {
        id:1,
        name: 'Ashwini',
        email: 'ashwini@gmail.com',
        age: '20'
    },
    {
        id:2,
        name: 'Yash',
        email: 'yash@gmail.com',
        age: '21'
    },
    {
        id:3,
        name: 'Mahesh',
        email: 'mahesh@gmail.com',
        age: '20'
    },
    {
        id:4,
        name: 'Vishnu',
        email: 'vishnu@gmail.com',
        age: '19'
    },
    {
        id:5,
        name: 'Purva',
        email: 'purva@gmail.com',
        age: '20'
    },
    {
        id:6,
        name: 'Ganesh',
        email: 'ganesh@gmail.com',
        age: '21'
    },
    {
        id:7,
        name: 'Ashwini',
        email: 'ashwini@gmail.com',
        age: '20'
    },
    {
        id:8,
        name: 'Yash',
        email: 'yash@gmail.com',
        age: '21'
    },
    {
        id:9,
        name: 'Mahesh',
        email: 'mahesh@gmail.com',
        age: '20'
    },
    {
        id:10,
        name: 'Vishnu',
        email: 'vishnu@gmail.com',
        age: '19'
    },
    {
        id:11,
        name: 'Purva',
        email: 'purva@gmail.com',
        age: '20'
    },
    {
        id:12,
        name: 'Ganesh',
        email: 'ganesh@gmail.com',
        age: '21'
    },
    {
        id:13,
        name: 'Ashwini',
        email: 'ashwini@gmail.com',
        age: '20'
    },
    {
        id:14,
        name: 'Yash',
        email: 'yash@gmail.com',
        age: '21'
    },
    {
        id:15,
        name: 'Mahesh',
        email: 'mahesh@gmail.com',
        age: '20'
    },
    {
        id:16,
        name: 'Vishnu',
        email: 'vishnu@gmail.com',
        age: '19'
    },
    {
        id:17,
        name: 'Purva',
        email: 'purva@gmail.com',
        age: '20'
    },
    {
        id:18,
        name: 'Ganesh',
        email: 'ganesh@gmail.com',
        age: '21'
    },
    {
        id:19,
        name: 'Ganesh',
        email: 'ganesh@gmail.com',
        age: '21'
    }
  ]
  const [records, setRecords] = useState(data);

  function handleFilter(event){
    const newData = data.filter(row => {
        return row.name.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
  }

  return (
    <div className='container mt-5'>
        <div className='text-end'><input type="text" onChange={handleFilter} /></div>
        <DataTable
            columns={columns}
            data={records}
            selectableRows
            fixedHeader
            pagination
        ></DataTable>
    </div>
  )
}

export default Table
