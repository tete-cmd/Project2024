import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    employeeNumber: '',
    email: '',
    password: '',
    station: '',
    designation: '',
    position: '',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    const errors = {};
    if (!formData.email.includes('@')) errors.email = 'Invalid email address';
    if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    // Add more validation rules as needed
    return errors;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      // Handle validation errors
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/users', formData);

      if (response.data.success) {
        alert('Registration successful! Please check your email to verify your account.');
        navigate('/'); // Redirect to login page or another page
      } else {
        alert('Signup failed, please try again.');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      alert('Signup failed, please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="input-box">
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="input-box">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="employeeNumber"
              placeholder="Employee Number"
              value={formData.employeeNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="station"
              placeholder="Station"
              value={formData.station}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-box">
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;