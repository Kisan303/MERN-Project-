//Student Name: Kisan Rai 
//Student Number: C0910925

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './components/addUser';        // Add User component
import UpdateUser from './components/updateUser';  // Update User component
import ViewUser from './components/viewUser';      // View User component
import Layout from './components/layout';          // Layout component
import UserDetail from './components/userDetail'; // User Detailed component
import Login from './components/Login';            // Login component

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} /> {/* Login page */}
          <Route path="/addUser" element={<AddUser />} /> {/* Add User page */}
          <Route path="/updateUser/:id" element={<UpdateUser />} /> {/* Update User page */}
          <Route path="/viewUser" element={<ViewUser />} /> {/* View User page */}
          <Route path="/userDetail/:id" element={<UserDetail />} /> {/* User Detail page */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
