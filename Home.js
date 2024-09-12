import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('authToken'); // Use JWT token for authentication

      if (!token) {
        setError('User not authenticated. Please log in.');
        navigate('/login'); // Redirect to login if not authenticated
        return;
      }

      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}` // Set Authorization header with token
          }
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.response && error.response.status === 401) {
          setError('Unauthorized access. Please log in again.');
          navigate('/login'); // Redirect to login on unauthorized error
        } else {
          setError('An error occurred while fetching the profile. Please try again.');
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    if (profile) {
      // Check user role and navigate to respective dashboard
      if (profile.role === 'admin') {
        navigate('/AdminDashboard');
      } else if (profile.role === 'employee') {
        navigate('/Dashboard1');
      } else {
        setError('Unknown user role. Please contact support.');
      }
    }
  }, [profile, navigate]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Loading...</div>; // You can use a spinner or loading component here
  }

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome, {profile.name}!</p> {/* Optional: Display user info */}
    </div>
  );
};

export default UserProfile;
