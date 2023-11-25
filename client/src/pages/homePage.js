import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./ScollCard.css";
import { GuideTable } from "./TablePages/GuidePage";
import { ProductTable } from "./TablePages/ProductPage";
import { EventTable } from "./TablePages/EventPage";
import { FacilityTable } from "./TablePages/FacilityPage";

function HomePage() {
  // eslint-disable-next-line
  const Navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      Navigate('/login');
    } 
    // eslint-disable-next-line
  }, []);


  

  return (
    <>
      <div className="container m-auto my-2 ">
       

        {/* Manage Tourist Guide*/}
        <div className="my-4">
          <p className="ms-3 text-4xl my-3 font-serif">Manage Tourist Guide</p>
          <GuideTable />
        </div>
        {/* Manage Events */}
        <div className="my-4">
          <p className="ms-3 text-4xl my-3 font-serif">Manage Events</p>
          <EventTable />
        </div>
        {/* Manage Products */}
        <div className="my-4">
          <p className="ms-3 text-4xl my-3 font-serif">Manage Products</p>
          <ProductTable />
        </div>
        {/* Manage nearby Faclities */}
        <div className="my-4">
          <p className="ms-3 text-4xl my-3 font-serif">Manage Nearby Faclities</p>
          <FacilityTable />
        </div>
      </div>
    </>
  );
}

export default HomePage;


