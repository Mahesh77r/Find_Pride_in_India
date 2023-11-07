import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContext";

import "./ScollCard.css";
import {
  GuideCards,
  AddCards,
  EventCard,
  ProductCard,
  FacilityCard,
} from "../components/Cards/Cards";
import {
  FormEvents,
  FormFacility,
  FormPlaceSummary,
  FormProduct,
  FormTouristGuide,
} from "../components/Forms/ManagementsForms";
import {
  FamousPlaces,
  GuideData,
  WardhaProducts,
  Facilities,
  Summary,
} from "../components/DemoData";
import { EditModal } from "../components/Modal/Modal";
import { fetchProduct } from "../services/domCRUD";


// 



function HomePage() {

  const [product, setProduct] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getProducts();
    } else {
      Navigate('/login');
    }
  }, []);

  const { user } = useUser()
  const getProducts = async () => {
    const res = await fetchProduct(user.adminName);
    console.log(res.data.data)
    setProduct(res.data.data);
  };

  return (
    <>
      <div className="container m-auto my-2">
        {/* About Place */}
        {Summary.map((data, index) => (

          <div key={index} className="my-4 p-4  rounded-2xl">
            <div className="flex items-center justify-center">
              <p className="ms-3 text-4xl text-center font-bold my-3 font-serif me-5">
                Place Summary
              </p>
              <UpdateButton update_title={"Place Summary"} updateform={<FormPlaceSummary admin_name={data.admin_name}
                address={data.address}
                city={data.city}
                destination_name={data.destination_name}
                email={data.email}
                image_url={data.image_url}
                mobile_no={data.mobile_no}
                state={data.state} />} />
            </div>
            <div className="flex flex-row">

              <img
                className="h-50 w-50 rounded-xl"
                src={data.image_url}
                alt="Place"
              />
              {/*  */}
              <div className="ms-5">
                <p className="text-gray-900 text-lg my-2 text-justify">
                  <span className="font-bold text-2xl ">
                    {" "}
                    {data.destination_name}
                  </span>{" "}
                  , {data.descp}
                </p>
                <p className="text-gray-900 text-lg my-3 font-semibold">
                  Place Admin Name :{" "}
                  <span className="text-gray-800 font-normal text-lg">
                    {data.admin_name}
                  </span>{" "}
                </p>
                <div className="flex">
                  <p className="text-gray-900 text-lg  font-semibold">
                    State :{" "}
                    <span className="text-gray-800 font-normal text-lg">
                      {data.state}
                    </span>
                  </p>
                  <p className="text-gray-900 text-xl  ms-5 font-semibold">
                    City :{" "}
                    <span className="text-gray-800 font-normal text-lg">
                      {data.city}
                    </span>
                  </p>
                </div>

                <p className="text-gray-900 text-lg my-2 font-semibold">
                  Address :{" "}
                  <span className="text-gray-800 font-normal text-lg">
                    {data.address}
                  </span>
                </p>
                <p className="text-gray-900 text-lg my-2 font-semibold">
                  Contact Number :{" "}
                  <span className="text-gray-800 font-normal text-lg">
                    {data.mobile_no}
                  </span>
                </p>
                <p className="text-gray-900 text-lg my-2 font-semibold">
                  E-mail Address :{" "}
                  <span className="text-gray-800 font-normal text-lg">
                    {data.email}
                  </span>
                </p>
              </div>

            </div>
            <div></div>
          </div>

        ))}

        {/* Manage Tourist Guide*/}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Tourist Guide</p>
          <div className="scroll-container">
            <div className="scroll-content items-center">
              {GuideData.map((guide, index) => (
                <div key={index} className="min-w-[380px] p-4 ">
                  <GuideCards
                    guidename={guide.guidename}
                    fees={guide.fees}
                    contact_number={guide.contact_number}
                    img_url={guide.img_url}
                  />
                </div>
              ))}
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards
                  DataName="Tourist Guide"
                  add_form={<FormTouristGuide />}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Manage Events */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Events</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex items-center">
              {FamousPlaces.map((eve, index) => (
                <div key={index} className="min-w-[350px] p-4">
                  <EventCard
                    event_name={eve.eventName}
                    descp={eve.descrip}
                    image_url={eve.imgURL}
                    event_date={eve.date}
                  />
                </div>
              ))}
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Events" add_form={<FormEvents />} />
              </div>
            </div>
          </div>
        </div>
        {/* Manage Products */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Products</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex items-center">
              {product.map((prod) => (
                <div key={prod._id} className="min-w-[380px] h-auto p-4">
                  
                    <ProductCard
                      filename={prod.filename}
                      prod_name={prod.product_name}
                      prod_price={prod.product_price}
                      prod_quant={prod.quantity_available}
                      prod_descp={prod.product_descp}
                    />
                  
                </div>
              ))}

              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Products" add_form={<FormProduct />} />
              </div>
            </div>
          </div>
        </div>
        {/* Manage nearby Faclities */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Nearby Faclities</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex items-center">
              {Facilities.map((fac, index) => (
                <div key={index} className="min-w-[550px]  p-4 ">
                  <FacilityCard
                    fac_name={fac.facility_name}
                    fac_cont={fac.contact_detail}
                    fac_img_url={fac.img_url}
                    fac_loact={fac.location_url}
                  />
                </div>
              ))}
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Products" add_form={<FormFacility />} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;

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
