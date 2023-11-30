import React, { useEffect, useState } from 'react'
import { FetchDataTable } from '../components/Table/FetchDataTable'
import { getDOM } from '../services/domCRUD'
import {toast,ToastBar} from 'react-hot-toast'
export const AllDestination = () => {
const columns = [
    {name:'msr'}
]
const [destData,setDestData] = useState([])

const getAllDest = async() => {
    try {
       const res = await getDOM();
       console.log(res.data)
        // setDestData(res.data.data);
    } catch (error) {
        toast.error(error);
    }
}
    useEffect(()=>{
        getAllDest()
    })
  return (
    <>
    <ToastBar/>
    <FetchDataTable columns={columns}/>
    </>
  )
}
