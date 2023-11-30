import { React, useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ScollCard.css";
import { GuideTable } from "./TablePages/GuidePage";
import { ProductTable } from "./TablePages/ProductPage";
import { EventTable } from "./TablePages/EventPage";
import { FacilityTable } from "./TablePages/FacilityPage";
import { ArtistTable } from "./TablePages/ArtistPage";

function HomePage() {
  // eslint-disable-next-line
  const navigate = useNavigate();
const [userData , setUser] = useState(false)
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      
      navigate('/login');
    } else{
      
      setUser(true)
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
   
   {userData ? (
      <div className="container m-auto my-2 ">

        {/* Manage Artist*/}
        <div className="my-4">
          <p className="ms-3 text-4xl my-3 font-serif">Manage Local Artist</p>
          < ArtistTable />
        </div>
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
      </div> ) : (
        <p>User data not available</p>
      )}
    </>
  );
}

export default HomePage;


