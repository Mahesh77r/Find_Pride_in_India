import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AllDOM from './pages/allDOM';
import AddDOM from './components/Forms/addDOM';

import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import ResetPassword from './pages/ResetPass';

import { GraphPage } from './pages/GraphPage';
import { SideNavbar } from './components/navbar/SideNavbar';
import { navForDOM } from './components/navbar/NavLink';
import { useUser } from './context/UserContext';
import { TopNavbar } from './components/navbar/TopNavbar';
import { Practice } from './pages/Practice';

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
  const contentMargin = isSideNavbarOpen ? 'ml-72' : 'ml-16';

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
            <Route path="/checkpoints" element={<AllDOM />} />
            <Route path="/form" element={<AddDOM />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />
            <Route path="/order" element={<GraphPage />} />
            <Route path="/practice" element={<Practice />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </>
);

}

export default App;
