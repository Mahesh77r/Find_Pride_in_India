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
import {FormEvents,FormFacility,FormProduct,FormTouristGuide} from "../components/Forms/ManagementsForms"
import { FamousPlaces, GuideData, WardhaProducts , Facilities} from '../components/DemoData'
function HomePage() {

  return (
    <>
      <div className="container m-auto my-6">
        {/* About Place */}
        <p className="ms-3 text-4xl font-serif pt-3">Bapu Kuti</p>
        <div className="my-4">
          <div className="flex flex-row">
            <img className="h-50 w-50" src={Img} alt="Place" />
            <p className="h-50 w-50 mx-4 mt-3">Bapu Kuti, also known as Bapu's Cottage, is a historic and iconic thatched-roof hut
             situated in the village of Sewagram, located in the Wardha district of Maharashtra, India. This unassuming dwelling 
             holds profound significance in the annals of Indian history as it was the primary residence of Mahatma Gandhi, 
             the revered leader of the Indian independence movement against British colonial rule.<br/> <br/>

            The name "Bapu" was an endearing term used to address Mahatma Gandhi, signifying his status as the 
            "Father of the Nation" in India. Bapu Kutir served as more than just a shelter; it was a living testament to 
            Gandhi's principles of simplicity, self-sufficiency, and non-violence. The cottage was a physical manifestation 
            of his commitment to a Spartan lifestyle, emphasizing the use of indigenous materials and sustainable practices.<br/><br/>
            
            Bapu Kuti remains a significant historical and cultural landmark, preserving the legacy of Mahatma Gandhi's struggle 
            for India's independence and his commitment to the ideals of truth, non-violence, and simplicity. It stands as a 
            living museum, providing insights into the life and work of this remarkable leader and his enduring impact on India's
             history and the global pursuit of peace and justice.</p>
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
                <AddCards DataName="Tourist Guide" add_form={<FormTouristGuide/>}/>
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
                <AddCards DataName="Events" add_form={<FormEvents/>}/>
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
                <AddCards DataName="Products" add_form={<FormProduct/>}/>
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
                <AddCards DataName="Products" add_form={<FormFacility/>}/>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default HomePage;
