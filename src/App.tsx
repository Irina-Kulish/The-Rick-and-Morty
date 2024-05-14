import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/Authorization/Register';
import { Login } from './components/Authorization/Login';
import './index.css';
import { Dashboard } from './components/Dashboard/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
