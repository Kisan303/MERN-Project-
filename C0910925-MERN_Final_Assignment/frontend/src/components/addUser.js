//Student Name: Kisan Rai 
//Student Number: C0910925

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pane, TextInputField, TextareaField, Button, Heading, Alert } from 'evergreen-ui';

const AddUser = () => {
  const navigate = useNavigate();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await axios.post('/api/addUser', formData);
      setSuccessMessage('User added successfully!');
      setTimeout(() => navigate('/viewUser'), 2000);
    } catch (error) {
      setErrorMessage(
        error.response?.data || 'An error occurred while adding the user'
      );
    }
  };

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
      <Pane display="flex" justifyContent="space-between" alignItems="center" marginBottom={16}>
        <Heading size={600}>Add User</Heading>
        
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
        {/* Row 1: First Name | Last Name */}
        <Pane display="flex" gap={16} marginBottom={16}>
          <TextInputField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            flex={1}
            required
          />
          <TextInputField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            flex={1}
            required
          />
        </Pane>

        {/* Row 2: Date of Birth | Phone Number */}
        <Pane display="flex" gap={16} marginBottom={16}>
          <TextInputField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            flex={1}
            required
          />
          <TextInputField
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            flex={1}
            required
          />
        </Pane>

        {/* Row 3: Email | Address 1 */}
        <Pane display="flex" gap={16} marginBottom={16}>
          <TextInputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            flex={1}
            required
          />
          <TextInputField
            label="Address 1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            flex={1}
            required
          />
        </Pane>

        {/* Row 4: Address 2 | City */}
        <Pane display="flex" gap={16} marginBottom={16}>
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
            required
          />
        </Pane>

        {/* Row 5: Postal Code | Country */}
        <Pane display="flex" gap={16} marginBottom={16}>
          <TextInputField
            label="Postal Code"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            flex={1}
            required
          />
          <TextInputField
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            flex={1}
            required
          />
        </Pane>

        {/* User Notes */}
        <TextareaField
          label="User Notes"
          name="userNotes"
          value={formData.userNotes}
          onChange={handleChange}
          rows={3}
          marginBottom={16}
        />

        <Pane display="flex" justifyContent="flex-end" gap={16}>
          <Button type="button" appearance="default" onClick={() => navigate('/viewUser')}>
            Cancel
          </Button>
          <Button type="submit" appearance="primary">
            Add User
          </Button>
        </Pane>
      </form>
    </Pane>
  );
};

export default AddUser;
