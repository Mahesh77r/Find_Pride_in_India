import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/loginPage';
import Table from './components/Table/Table';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/table" element={<Table/>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
