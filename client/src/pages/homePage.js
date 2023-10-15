import{ React }from "react";
import "./ScollCard.css";
import {
  GuideCards,
  AddCards,
  EventCard,
  ProductCard,
  FacilityCard
} from "../components/Cards/Cards";
import Img from "../images/BapuProfile.jpeg";

import { FamousPlaces, GuideData, WardhaProducts , Facilities} from '../components/DemoData'
function HomePage() {



  return (
    <>
      <div className="container m-auto my-6">
        {/* About Place */}
        <div className="my-4">
          <div>
            <img className="h-50 w-50" src={Img} alt="Place" />
          </div>
          <div></div>
        </div>
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
                <AddCards DataName="Tourist Guide" />
              </div>
            </div>
          </div>
        </div>
        {/* Manage Events */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Events</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex">
              {FamousPlaces.map((eve, index) => (
                <div key={index} className="min-w-[350px] p-4">
                  <EventCard
                    event_name={eve.eventName}
                    descp={eve.descrip}
                    image_url={eve.imgURL}
                  />
                </div>
              ))}
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Events" />
              </div>
            </div>
          </div>
        </div>
        {/* Manage Products */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Products</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex items-center">
              {
                WardhaProducts.map((prod, index) => (
                  <div key={index} className="min-w-[380px]  p-4 ">

                    <ProductCard
                      img_url={prod.prod_img_url}
                      prod_name={prod.product_name}
                      prod_price={prod.product_price}
                      prod_quant={prod.quantity_available}
                      prod_descp={prod.product_descp}
                    />
                  </div>
                ))
              }
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Products" />
              </div>
            </div>
          </div>
        </div>
        {/* Manage nearby Faclities */}
        <div className="my-4">
          <p className="ms-3 text-4xl font-serif">Manage Nearby Faclities</p>
          <div className="scroll-container overflow-x-auto whitespace-no-wrap">
            <div className="scroll-content flex items-center">
              {
                Facilities.map((fac, index) => (
                  <div key={index} className="min-w-[550px]  p-4 ">

                    <FacilityCard
                      fac_name={fac.facility_name}
                      fac_cont={fac.contact_detail}
                      fac_img_url={fac.img_url}
                      fac_loact={fac.location_url}
                    />
                  </div>
                ))
              }
              <div className="min-w-[350px] flex items-center p-4">
                <AddCards DataName="Products" />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default HomePage;
