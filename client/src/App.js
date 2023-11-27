import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AddDOM from './components/Forms/addDOM';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ResetPassword from './pages/ResetPass';
import {OrderPage} from './pages/OrderPage';
import { SideNavbar } from './components/navbar/SideNavbar';
import { navForDOM } from './components/navbar/NavLink';
import { useUser } from './context/UserContext';
import { TopNavbar } from './components/navbar/TopNavbar';
import { Practice } from './pages/Practice';
import { Chart } from './components/Charts/Chart';
import { ChartPlaceAdmin } from './components/Charts/ChartPlaceAdmin';
import { Checkpoints } from './pages/TablePages/Checkpoints';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(true);
  const [login,setLogin ] = useState(false);
  const toggleSideNavbar = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };
  
  const {user} = useUser();
  console.log(user.adminName)
  useEffect(() => {
    // Check if there is a user in local storage and set the login state accordingly
    if (localStorage.getItem("user")) {
      setLogin(true); // Set to true if a user is found in local storage
    }
  }, [user]);
  
  
  console.log(login)
  const contentMargin = isSideNavbarOpen ? 'ml-64' : 'ml-16';

return (
  <>
    <BrowserRouter>
    <TopNavbar />
      <div className="flex">
        {/* Display the side navbar if user is logged in */}
        {login && (
          <SideNavbar
            navigation={navForDOM}
            isSideNavbarOpen={isSideNavbarOpen}
            toggleSideNavbar={toggleSideNavbar}
          />
        )}

        <div className={`flex-1 overflow-x-hidden ${login ? contentMargin : 'ml-0'} duration-700 bg-[#ECF0F5]`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkpoints" element={<Checkpoints />} />
            <Route path="/form" element={<AddDOM />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/chart" element={<Chart/>}/>
            <Route path="/chart1" element={<ChartPlaceAdmin/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </>
);

}

export default App;
