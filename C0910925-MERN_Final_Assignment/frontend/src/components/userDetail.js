//Student Name: Kisan Rai 
//Student Number: C0910925

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Pane,
  TextInputField,
  TextareaField,
  Button,
  Heading,
  Alert,
} from 'evergreen-ui';

const UserDetail = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate hook for redirection

  // Fetch the user details when the component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setErrorMessage('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [id]);

  // Handle delete user action
  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await axios.delete(`/api/deleteUser/${id}`);
        if (response.status === 200) {
          navigate('/viewUser'); // Redirect to the user list page after deletion
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setErrorMessage('Error deleting user');
      }
    }
  };

  if (!user) {
    return (
      <Pane display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Heading size={500}>Loading...</Heading>
      </Pane>
    );
  }

  return (
    <Pane
      className="container"
      marginY={24}
      maxWidth={800}
      marginX="auto"
      padding={24}
      borderRadius={8}
      elevation={1}
      background="tint1"
    >
      {/* Header with View Users Button */}
      <Pane display="flex" justifyContent="space-between" alignItems="center" marginBottom={16}>
        <Heading size={600}>User Details</Heading>
        <Button appearance="primary" onClick={() => navigate('/viewUser')}>
          View Users
        </Button>
      </Pane>

      {errorMessage && (
        <Alert intent="danger" marginBottom={16} title="Error">
          {errorMessage}
        </Alert>
      )}

      <Pane display="flex" flexDirection="column" gap={16}>
        {/* User Information - Two Columns per Row */}
        <Pane display="flex" gap={16}>
          <TextInputField
            label="First Name"
            value={user.firstName}
            readOnly
            flex={1}
          />
          <TextInputField
            label="Last Name"
            value={user.lastName}
            readOnly
            flex={1}
          />
        </Pane>

        <Pane display="flex" gap={16}>
          <TextInputField
            label="Date of Birth"
            value={new Date(user.dateOfBirth).toLocaleDateString()}
            readOnly
            flex={1}
          />
          <TextInputField
            label="Phone Number"
            value={user.phoneNumber}
            readOnly
            flex={1}
          />
        </Pane>

        <Pane display="flex" gap={16}>
          <TextInputField
            label="Email"
            value={user.email}
            readOnly
            flex={1}
          />
          <TextInputField
            label="Address 1"
            value={user.address1}
            readOnly
            flex={1}
          />
        </Pane>

        <Pane display="flex" gap={16}>
          <TextInputField
            label="Address 2"
            value={user.address2 || 'N/A'}
            readOnly
            flex={1}
          />
          <TextInputField
            label="City"
            value={user.city}
            readOnly
            flex={1}
          />
        </Pane>

        <Pane display="flex" gap={16}>
          <TextInputField
            label="Postal Code"
            value={user.postalCode}
            readOnly
            flex={1}
          />
          <TextInputField
            label="Country"
            value={user.country}
            readOnly
            flex={1}
          />
        </Pane>

        {/* User Notes */}
        <TextareaField
          label="User Notes"
          value={user.userNotes || ''}
          readOnly
          resize="none"
        />

        {/* Action Buttons */}
        <Pane display="flex" justifyContent="flex-end" gap={16}>
          <Button
            appearance="primary"
            intent="success"
            onClick={() => navigate(`/updateUser/${user._id}`)}
          >
            Update User
          </Button>
          <Button appearance="primary" intent="danger" onClick={handleDeleteUser}>
            Delete User
          </Button>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default UserDetail;
