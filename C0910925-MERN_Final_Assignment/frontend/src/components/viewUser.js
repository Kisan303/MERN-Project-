//Student Name: Kisan Rai 
//Student Number: C0910925

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react'; // Import AG Grid
import 'ag-grid-community/styles/ag-grid.css'; // AG Grid styles
import 'ag-grid-community/styles/ag-theme-alpine.css'; // AG Grid theme styles

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For programmatic navigation

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Correct API endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrorMessage('Error fetching user data');
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchUsers();
  }, []); // Run this effect only once when the component mounts

  const columnDefs = [
    { headerName: "First Name", field: "firstName" },
    { headerName: "Last Name", field: "lastName" },
    { headerName: "Date of Birth", field: "dateOfBirth", valueFormatter: (params) => new Date(params.value).toLocaleDateString() },
    { headerName: "Address 1", field: "address1" },
    { headerName: "Address 2", field: "address2" },
    { headerName: "City", field: "city" },
    { headerName: "Postal Code", field: "postalCode" },
    { headerName: "Country", field: "country" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Email", field: "email" },
  ];

  // If loading, show a spinner or loading message
  if (loading) {
    return (
      <div className="container text-center">
        <h2>Loading users...</h2>
      </div>
    );
  }

  return (
    <div className="container-fluid my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Simple, custom-styled Add User button */}
        <Link to="/addUser">
          <button className="simple-button">
            Add User
          </button>
        </Link>
      </div>

      {/* Display error message if any */}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      {/* AG-Grid component */}
      <div className="ag-theme-alpine" style={{ height: 500, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={users}
          pagination={true}
          domLayout="autoHeight"
          enableBrowserTooltips={true}
          rowSelection="single"
          onRowClicked={(event) => navigate(`/userDetail/${event.data._id}`)} // Navigate to user details on row click
        />
      </div>
    </div>
  );
};

export default ViewUser;
