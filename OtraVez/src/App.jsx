import { Routes, Route } from 'react-router';
import Register from './assets/views/register/Register';
import Dashboard from './assets/views/dashboard/Dashboard';
import Users from './assets/views/users/Users';
import React from 'react';


function App() {

  return (
    <Routes>

      <Route path="/" element={<Dashboard/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/users/:id" element={<Users />} />


    </Routes>
  );
}

export default App