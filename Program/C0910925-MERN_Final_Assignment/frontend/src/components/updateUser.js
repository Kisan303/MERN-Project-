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

const UpdateUser = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    userNotes: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setFormData(response.data);
      } catch (error) {
        setErrorMessage('Error loading user details.');
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for updating user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.put(`/api/updateUser/${id}`, formData);
      setSuccessMessage('User updated successfully!');
      setTimeout(() => navigate('/viewUser'), 2000);
    } catch (error) {
      setErrorMessage(error.response?.data || 'An error occurred while updating the user');
      console.error('Error updating user:', error);
    }
  };

  // Cancel button handler to navigate back to the user list page
  const handleCancel = () => {
    navigate('/viewUser');
  };

  // If loading, show loading message
  if (loading) {
    return (
      <Pane display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Heading size={500}>Loading user details...</Heading>
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
      {/* Header with navigation */}
      <Pane display="flex" justifyContent="space-between" alignItems="center" marginBottom={16}>
        <Heading size={600}>Update User</Heading>
        <Button appearance="primary" onClick={() => navigate('/viewUser')}>
          View Users
        </Button>
      </Pane>

      {errorMessage && (
        <Alert intent="danger" marginBottom={16} title="Error">
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert intent="success" marginBottom={16} title="Success">
          {successMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Pane display="flex" flexDirection="column" gap={16}>
          {/* Input Fields - Two Columns per Row */}
          <Pane display="flex" gap={16}>
            <TextInputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              flex={1}
            />
            <TextInputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              flex={1}
            />
          </Pane>

          <Pane display="flex" gap={16}>
            <TextInputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              flex={1}
            />
            <TextInputField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              flex={1}
            />
          </Pane>

          <Pane display="flex" gap={16}>
            <TextInputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              flex={1}
            />
            <TextInputField
              label="Address 1"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              flex={1}
            />
          </Pane>

          <Pane display="flex" gap={16}>
            <TextInputField
              label="Address 2"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              flex={1}
            />
            <TextInputField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              flex={1}
            />
          </Pane>

          <Pane display="flex" gap={16}>
            <TextInputField
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              flex={1}
            />
            <TextInputField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              flex={1}
            />
          </Pane>

          {/* User Notes */}
          <TextareaField
            label="User Notes"
            name="userNotes"
            value={formData.userNotes}
            onChange={handleChange}
            resize="none"
          />

          {/* Buttons */}
          <Pane display="flex" justifyContent="flex-end" gap={16}>
            <Button appearance="primary" intent="success" type="submit">
              Update User
            </Button>
            <Button appearance="primary" intent="danger" onClick={handleCancel}>
              Cancel
            </Button>
          </Pane>
        </Pane>
      </form>
    </Pane>
  );
};

export default UpdateUser;
