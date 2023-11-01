import { React, useState } from "react";
import "./Cards.css";
import { Link } from 'react-router-dom';
import { DeleteModal, EditModal } from "../Modal/Modal";
import { FormTouristGuide,FormEvents ,FormFacility,FormProduct} from "../Forms/ManagementsForms";


export const GuideCards = ({ guidename, img_url, fees, contact_number }) => {
  return (
    <div className="rounded bgf overflow-hidden shadow-lg transform transition-transform hover:scale-105">
      {/* Buttons */}
      <UpdateDeletebuttons Updateform={<FormTouristGuide img_url={img_url} guide_name={guidename} contact_detail={contact_number} fees={fees}/>} update_delete_title={"Guide"} />

      {/*  */}
      <div className="row flex justify-center">
        <img
          className="w-25 h-20  border border-solid  rounded-full"
          alt="Guide"
          src={img_url}
        />
      </div>
      {/*  */}
      <div className="px-6 text-center py-4">
        <div className="font-bold text-xl mb-2">{guidename}</div>
        <p className="text-gray-700 text-base">Fees : {fees}</p>
        <p className="text-gray-700 text-base">
          Contact Number : {contact_number}
        </p>
      </div>
    </div>
  );
};

export const EventCard = ({ event_name, event_date,image_url, descp }) => {
  return (
    <>
      <div className="rounded bgf item-center overflow-hidden shadow-lg transform transition-transform hover:scale-105">
        {/* Buttons */}
        <UpdateDeletebuttons Updateform={<FormEvents event_name={event_name} img_url={image_url} event_date={event_date} event_descp={descp}/>} update_delete_title={"Event"} />

        {/* Image */}
        <div className="row w-full h-40">
          <img className="w-full h-full" alt="Events " src={image_url} />
        </div>
        {/* Place Name */}
        <div className="font-bold mt-3 text-center text-2xl mb-2">
          {event_name}
        </div>
        {/* Place Name */}
        <div className="text-gray-700 mt-3 ms-3 text-base ">
          Upcoming on Date :{event_date}
        </div>

        {/* Descp */}
        <div className="px-2 text-left py-4">
          <p className="text-gray-700 text-base">{descp}</p>
        </div>
      </div>
    </>
  );
};

export const AddCards = ({ DataName, add_form}) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false)
  function closeModalAdd() {
    setIsOpenAdd(false)
  }
  function openModalAdd() {
    setIsOpenAdd(true)
  }
  return (
    <>
    <EditModal isOpen={isOpenAdd} closeModal={closeModalAdd} title={"Addd"} Updateform={add_form}/>
      <div className="rounded bgf item-center overflow-hidden shadow-lg transform transition-transform hover:scale-105" onClick={openModalAdd}>
        <div className="row justify-center mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="green"
            className="w-50 h-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="px-6 text-center py-4">
          <div className="font-bold  text-xl mb-2">Add New {DataName}</div>
        </div>
      </div>
    </>
  );
};

export const ProductCard = ({ img_url, prod_name, prod_price, prod_quant, prod_descp }) => {
  return (
    <>
      <div className="rounded bgf item-center overflow-hidden shadow-lg transition-transform hover:scale-105">
        {/* Buttons */}
        <UpdateDeletebuttons Updateform={<FormProduct prod_name={prod_name} img_url={img_url} prod_desp={prod_descp} prod_price={prod_price} prod_quant={prod_quant}/>} update_delete_title={"Product"} />

        {/* Image */}
        <div className="row rounded-lg w-full h-40">
          <img className="w-full h-full py-2 px-5 rounded-md" alt="Events " src={img_url} />
        </div>
        {/* product name */}
        <div className="text-2xl my-2 font-bold text-center">
          {prod_name}
        </div>
        {/* quantity and price */}
        <div className="row">
          <div className="flex justify-between">
            <div className="ms-3 text-lg text-gray-700">Price <span className="font-semibold text-gray-800">₹{prod_price}</span></div>
            <div className="me-3 text-lg text-gray-700">Quantity <span className="font-semibold text-gray-800">{prod_quant}</span></div>
          </div>
        </div>
        {/* descp */}
        <div className="p-3 text-left text-base text-gray-700 my-2">
          {prod_descp}
        </div>
      </div>
    </>
  );
};

export const FacilityCard = ({ fac_name, fac_img_url, fac_cont, fac_loact }) => {
  return (
    <>
      <div className="rounded bgf   item-center overflow-hidden shadow-lg transition-transform hover:scale-105">
        {/* Buttons */}
        <UpdateDeletebuttons Updateform={<FormFacility fact_contact={fac_cont} img_url={fac_img_url} fact_name={fac_name} fact_loca={fac_loact}/>} update_delete_title={"Facility"} />
        {/* Image */}
        <div className="row w-full h-21 overflow-hidden">
          <img className="w-full h-full py-2 px-5" alt="Events " src={fac_img_url} />
        </div>
        {/* Facility Title */}
        <div className="text-2xl my-2 font-bold text-center">
          {fac_name}
        </div>
        {/* contact info */}

        <div className="flex justify-around items-center mb-3">
          <div className="text-lg text-gray-700 mx-3">
            Contact Number : {fac_cont}
          </div>

          <div className="me-3" >
            <Link to={fac_loact}>
              <button className="bg-blue-500 hover:bg-blue-600 flex p-2 rounded-xl text-white relative w-20" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span className="ms-1">Visit</span>
              </button>
            </Link>
          </div>


        </div>




      </div>
    </>
  );
};

const UpdateDeletebuttons = ({ update_delete_title, Updateform }) => {
  // Delete functions
  const [isOpenDelete, setIsOpenDelete] = useState(false)
  function closeModalDelete() {
    setIsOpenDelete(false)
  }
  function openModalDelete() {
    setIsOpenDelete(true)
  }
  // Edit functionS
  const [isOpenEdit, setIsOpenEdit] = useState(false)
  function closeModalEdit() {
    setIsOpenEdit(false)
  }
  function openModalEdit() {
    setIsOpenEdit(true)
  }

  return (
    <>
      <DeleteModal isOpen={isOpenDelete} closeModal={closeModalDelete} title={update_delete_title} />
      <EditModal Updateform={Updateform} isOpen={isOpenEdit} closeModal={closeModalEdit} title={update_delete_title} />

      <div className="row my-3">
        <div className="flex justify-between">
          <div className="ms-3">
            <button className="bg-purple-500 hover:bg-purple-600 flex p-2 rounded-2xl text-white relative" onClick={openModalEdit}>
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
              <span className="text">Update</span>
            </button>
          </div>
          <div className="me-3">
            <button className="bg-red-500 hover:bg-red-600 flex p-2 rounded-2xl text-white relative" onClick={openModalDelete}>
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
              <span className="text">Delete</span>
            </button>
          </div>
        </div>
      </div>
    </>

  );
}