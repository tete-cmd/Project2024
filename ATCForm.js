import React, { useState } from 'react';
import axios from 'axios';
import './ATCForm.css';

const ATCForm = () => {
  const [regData, setRegData] = useState({
    title: '',
    name: '',
    employeeNumber: '',
    email: '',
    password: '',
  });

  const [logData, setLogData] = useState({
    logbookNumber: '',
    logbookDate: '',
    entryDetails: '',
  });

  const [regError, setRegError] = useState('');
  const [logError, setLogError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');
  const [logSuccess, setLogSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle registration form input change
  const handleRegInputChange = (event) => {
    const { name, value } = event.target;
    setRegData({
      ...regData,
      [name]: value,
    });
  };

  // Handle logbook entry form input change
  const handleLogInputChange = (event) => {
    const { name, value } = event.target;
    setLogData({
      ...logData,
      [name]: value,
    });
  };

  // Handle registration form submit
  const handleRegSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setRegError('');
    setRegSuccess('');

    try {
      // Replace with your API endpoint
      const response = await axios.post('/api/register', regData);

      if (response.data.success) {
        setRegSuccess('Registration successful!');
        setRegData({
          title: '',
          name: '',
          employeeNumber: '',
          email: '',
          password: '',
        }); // Clear input fields
      } else {
        setRegError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setRegError('An error occurred while registering. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle logbook entry form submit
  const handleLogSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLogError('');
    setLogSuccess('');

    try {
      // Replace with your API endpoint
      const response = await axios.post('/api/logbook', logData);

      if (response.data.success) {
        setLogSuccess('Logbook entry submitted successfully!');
        setLogData({
          logbookNumber: '',
          logbookDate: '',
          entryDetails: '',
        }); // Clear input fields
      } else {
        setLogError('Failed to submit logbook entry. Please try again.');
      }
    } catch (error) {
      console.error('Logbook entry failed:', error);
      setLogError('An error occurred while submitting the logbook entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='wrapper'>
      <div className='background-image'></div>
      
        <div className='form-container'>
          <h1>ATC Form</h1>
          
          {/* Registration Section */}
          <form
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '30px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
              marginBottom: '20px',
            }}
            onSubmit={handleRegSubmit}
          >
            <h2>Registration</h2>
            <div className='input-box'>
              <select
                name='title'
                value={regData.title}
                onChange={handleRegInputChange}
                required
                style={inputStyle}
              >
                <option value=''>Select Title</option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Miss'>Miss</option>
                <option value='Other'>Other</option>
              </select>
            </div>
            <div className='input-box'>
              <input
                type='text'
                name='name'
                placeholder='Full Name'
                value={regData.name}
                onChange={handleRegInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div className='input-box'>
              <input
                type='text'
                name='employeeNumber'
                placeholder='Employee Number'
                value={regData.employeeNumber}
                onChange={handleRegInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div className='input-box'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={regData.email}
                onChange={handleRegInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div className='input-box'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={regData.password}
                onChange={handleRegInputChange}
                required
                style={inputStyle}
              />
            </div>
            {regError && <div style={{ color: 'red' }}>{regError}</div>}
            {regSuccess && <div style={{ color: 'green' }}>{regSuccess}</div>}
            <div style={{ textAlign: 'center' }}>
              <button
                type='submit'
                style={buttonStyle}
              >
                {loading ? 'Submitting...' : 'Register'}
              </button>
            </div>
          </form>
          
          {/* Logbook Entry Section */}
          <form
            style={{
              position: 'relative',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '30px',
              borderRadius: '10px',
              backdropFilter: 'blur(10px)',
            }}
            onSubmit={handleLogSubmit}
          >
            <h2>Logbook Entry</h2>
            <div className='input-box'>
              <input
                type='text'
                name='logbookNumber'
                placeholder='Logbook Number'
                value={logData.logbookNumber}
                onChange={handleLogInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div className='input-box'>
              <input
                type='date'
                name='logbookDate'
                placeholder='Logbook Date'
                value={logData.logbookDate}
                onChange={handleLogInputChange}
                required
                style={inputStyle}
              />
            </div>
            <div className='input-box'>
              <textarea
                name='entryDetails'
                placeholder='Entry Details'
                value={logData.entryDetails}
                onChange={handleLogInputChange}
                required
                style={{ ...inputStyle, height: '100px' }}
              />
            </div>
            {logError && <div style={{ color: 'red' }}>{logError}</div>}
            {logSuccess && <div style={{ color: 'green' }}>{logSuccess}</div>}
            <div style={{ textAlign: 'center' }}>
              <button
                type='submit'
                style={buttonStyle}
              >
                {loading ? 'Submitting...' : 'Submit Entry'}
              </button>
            </div>
          </form>
        </div>
      
    </div>
  );
};

const inputStyle = {
  fontSize: '1em',
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  marginBottom: '10px'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1em',
  backgroundColor: 'white',
  color: 'purple',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default ATCForm;