import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import HomePage from './pages/homePage';
import AllDOM from './pages/allDOM';
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkpoints" element={<AllDOM/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
