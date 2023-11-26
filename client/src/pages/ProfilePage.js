import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";

import "./ScollCard.css";
import { EditModal } from "../components/Modal/Modal";
import { FormPlaceSummary } from "../components/Forms/ManagementsForms";
import { fetchSummary } from "../services/domCRUD";

import {ChartPlaceAdmin} from "../components/Charts/ChartPlaceAdmin";
import { Chart } from '../components/Charts/Chart';

export const ProfilePage = () => {
    const [summary, setSummary] = useState([]);
    // eslint-disable-next-line
    const Navigate = useNavigate();
  
    useEffect(() => {
      if (localStorage.getItem("user")) {
        getSummary();
      } else {
        Navigate('/login');
      }
      // eslint-disable-next-line
    }, []);

    const getSummary = async () => {
        try {
          const storedUserJSON = localStorage.getItem('user');
          const storedUser = JSON.parse(storedUserJSON);
    
          const res = await fetchSummary(storedUser._id);
          const responseData = [res.data.data];
          console.log(responseData)
          // Ensure responseData is an array before setting the state
          if (Array.isArray(responseData)) {
            setSummary(responseData);
          } else {
            console.error('Invalid data format for summary:', responseData);
          }
        } catch (error) {
          console.error('Error fetching summary:', error);
        }
      };
  return (
    <div>

   
     {/* About Place */}
     {summary.map((data, index) => (

        <div key={index} className="my-4 p-4  rounded-2xl">
          <div className="flex items-center justify-center">
            <p className="ms-3 text-4xl text-center font-bold my-3 font-serif me-5">
              Place Summary
            </p>
            <UpdateButton update_title={"Place Summary"} updateform={<FormPlaceSummary admin_name={data.adminName}
              address={data.address}
              city={data.city}
              destination_name={data.destinationName}
              email={data.email}
              image_url={data.path}
              mobile_no={data.mobileNumber}
              state={data.state} />} />
          </div>
          <div className="flex flex-row bg-white p-4 items-center">

            <img
              className="h-[70%] w-[100%] rounded-xl"
              src={data.path}
              alt="Place"
            />
            {/*  */}
            <div className="ms-5">
              <p className="text-gray-900 text-lg my-2 text-justify">
                <span className="font-bold text-2xl ">

                  {data.destinationName}
                </span>
                , {data.summary}
              </p>
              <p className="text-gray-900 text-lg my-3 font-semibold">
                Place Admin Name :
                <span className="text-gray-800 font-normal text-lg">
                  {data.adminName}
                </span>
              </p>
              <div className="flex">
                <p className="text-gray-900 text-lg  font-semibold">
                  State :
                  <span className="text-gray-800 font-normal text-lg">
                    {data.state}
                  </span>
                </p>
                <p className="text-gray-900 text-xl  ms-5 font-semibold">
                  City :
                  <span className="text-gray-800 font-normal text-lg">
                    {data.city}
                  </span>
                </p>
              </div>

              <p className="text-gray-900 text-lg my-2 font-semibold">
                Address :
                <span className="text-gray-800 font-normal text-lg">
                  {data.address}
                </span>
              </p>
              <p className="text-gray-900 text-lg my-2 font-semibold">
                Contact Number :
                <span className="text-gray-800 font-normal text-lg">
                  {data.mobileNumber}
                </span>
              </p>
              <p className="text-gray-900 text-lg my-2 font-semibold">
                E-mail Address :
                <span className="text-gray-800 font-normal text-lg">
                  {data.email}
                </span>
              </p>
            </div>

          </div>
          <div></div>
        </div>
      ))}


      {/* charts */}
      <div>
        <ChartPlaceAdmin/>
        <Chart/>
      </div>
 </div>
  )

}

const UpdateButton = ({ updateform, update_title }) => {
    // Edit functionS
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    function closeModalEdit() {
      setIsOpenEdit(false);
    }
    function openModalEdit() {
      setIsOpenEdit(true);
    }
    return (
      <>
        <EditModal
          Updateform={updateform}
          isOpen={isOpenEdit}
          closeModal={closeModalEdit}
          title={update_title}
        />
        <div className="ms-2">
          <button
            className="bg-purple-500 hover:bg-purple-600 flex p-2 rounded-xl text-white relative"
            onClick={openModalEdit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <span className="ms-1 text">Update</span>
          </button>
        </div>
      </>
    );
  };