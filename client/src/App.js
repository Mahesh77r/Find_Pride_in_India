import React from 'react';
// import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import HomePage from './pages/homePage';
import AllDOM from './pages/allDOM';
import Navbar from './components/navbar/navbar';
import AddDOM from './components/Forms/addDOM';
import ResetPassword from './pages/ResetPass';
import { GraphPage } from './pages/GraphPage';
import { Chart } from './components/Charts/Chart';


function App() {
  // const navForMinistry = [
  //   { name: 'Dashboard', to: '/', current: true },
  //   { name: 'DOM\'s', to: '/checkpoints', current: false },
  //   { name: 'Products', to: '/products', current: false },
  // ];

  const navForDOM = [
    { name: 'Dashboard', to: '/', current: true },
    { name: 'Checkpoints', to: '/checkpoints', current: false },
    { name: 'Order', to: '/order', current: false },
    { name: 'Complaints', to: '/complaints', current: false },
  ]
  return (
    <>
    <BrowserRouter>
    <Navbar navigation={navForDOM}/>
    {/* <Navbar navigation={navForDOM}/> */}
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkpoints" element={<AllDOM/>} />
      <Route path="/form" element={<AddDOM/>} />
      <Route path="/resetpassword/:token" element={<ResetPassword/>} />
      <Route path="/order" element={<GraphPage/>} />
      <Route path="/graph" element={<Chart/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
