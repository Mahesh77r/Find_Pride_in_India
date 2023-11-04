import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllDOM from './pages/allDOM';
import AddDOM from './components/Forms/addDOM';
import ResetPassword from './pages/ResetPass';
import { GraphPage } from './pages/GraphPage';
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import { SideNavbar } from './components/navbar/SideNavbar';
import { navForDOM } from './components/navbar/NavLink';

function App() {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(true);

  const toggleSideNavbar = () => {
    setIsSideNavbarOpen(!isSideNavbarOpen);
  };

  const contentMargin = isSideNavbarOpen ? 'ml-72' : 'ml-16';

  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <SideNavbar
            navigation={navForDOM}
            isSideNavbarOpen={isSideNavbarOpen}
            toggleSideNavbar={toggleSideNavbar}
          />
          <div className={`flex-1 overflow-x-hidden ${contentMargin} duration-500`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/checkpoints" element={<AllDOM />} />
              <Route path="/form" element={<AddDOM />} />
              <Route path="/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/order" element={<GraphPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
