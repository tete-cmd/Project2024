import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { useAuth } from './AuthContext';

const CombinedDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [logEntries, setLogEntries] = useState([]);
  const [profile, setProfile] = useState({
    picture: '',
    title: '',
    firstName: '',
    lastName: '',
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState([]);
  const [itemInput, setItemInput] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [userRole, setUserRole] = useState(''); // 'admin' or 'employee'
  const [ipAddress, setIpAddress] = useState('');
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('date'); // Sorting by 'date' by default

  const itemsList = [
    'Runway Maintenance', 'STATION OPEN', 'RWY OPEN & SVC (serviceable)', 'RWY CLSD', 'UNSERVICEABILITY (U/S)',
    'EMG', 'STATION CLSD', 'NOTE', 'WX UPDATE', 'RWY CHG', 'Navigational Aids (NAVAIDs) Maintenance', 'Communication Systems Maintenance',
    'Airfield Lighting Maintenance', 'Control Tower Equipment Maintenance', 'VIP Movement',
    'Unusual Weather Phenomenon', 'Emergency Landing', 'Military Exercise', 'Airshow or Special Event',
    'Deviation from Flight Plan', 'Unauthorized Entry into Airspace', 'Loss of Communication',
    'Equipment Malfunction', 'Incorrect Readback', 'Near-Miss', 'Runway Incursion', 'Bird Strike',
    'Laser Strike', 'Fuel Dumping'
  ];

  const maintenanceOptions = [
    'Routine', 'Corrective', 'Preventive', 'Emergency', 'Unscheduled'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch IP address
    axios.get('https://api.ipify.org?format=json')
      .then(response => setIpAddress(response.data.ip))
      .catch(error => console.error('Error fetching IP address:', error));
  }, []);

  useEffect(() => {
    // Fetch log entries for the admin
    if (userRole === 'admin') {
      axios.get('http://localhost:3000/log-entries')
        .then(response => setLogEntries(response.data))
        .catch(error => console.error('Error fetching log entries:', error));
    }
  }, [userRole]);

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setProfile({
      picture: formData.get('picture'),
      title: formData.get('title'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
    });
    setCurrentView('logEntry');
  };

  const handleLogEntrySubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newEntry = {
      id: logEntries.length + 1,
      title: formData.get('title'),
      fullName: `${profile.firstName} ${profile.lastName}`,
      item: formData.get('item'),
      maintenanceType: maintenanceType,
      operationalComment: formData.get('operationalComment'),
      submissionDate: new Date().toISOString().replace('T', ' ').replace(/\..+/, '') + 'Z',
      verified: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      ipAddress: ipAddress,
    };
    setLogEntries([...logEntries, newEntry]);

    // Send new log entry to the server
    axios.post('http://localhost:3000/log-entries', newEntry)
      .then(response => console.log('Log entry submitted:', response))
      .catch(error => console.error('Error submitting log entry:', error));

    setCurrentView('loggedEntries');
  };

  const handleVerification = (id) => {
    setLogEntries(
      logEntries.map(entry =>
        entry.id === id ? { ...entry, verified: true } : entry
      )
    );
  };

  const handleEdit = (id) => {
    const entryToEdit = logEntries.find(entry => entry.id === id);
    if (entryToEdit) {
      setCurrentView('logEntry');
      // Populate the form with the entry data for editing
    }
  };

  const handleItemInputChange = (e) => {
    const value = e.target.value;
    setItemInput(value);
    setSuggestions(
      itemsList.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (suggestion) => {
    setItemInput(suggestion);
    setSuggestions([]);
  };

  const filteredEntries = logEntries
    .filter(entry =>
      entry.fullName.toLowerCase().includes(filter.toLowerCase()) ||
      entry.item.toLowerCase().includes(filter.toLowerCase()) ||
      entry.maintenanceType.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'name') {
        return a.fullName.localeCompare(b.fullName);
      }
      return 0;
    });

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h1>{userRole === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h1>
        <div style={styles.profileDisplay}>
          {profile.picture ? (
            <img src={URL.createObjectURL(profile.picture)} alt="Profile" style={styles.profileImage} />
          ) : (
            <div style={styles.profilePlaceholder}></div>
          )}
          <p style={styles.profileName}>{profile.title} {profile.lastName}</p>
        </div>
      </div>
      <div style={styles.navigationBar}>
        <button style={styles.navButton} onClick={() => setCurrentView('overview')}>User Profile</button>
        <button style={styles.navButton} onClick={() => setCurrentView('logEntry')}>Log Entry</button>
        <button style={styles.navButton} onClick={() => setCurrentView('loggedEntries')}>Logged Entries</button>
        {userRole === 'admin' && <button style={styles.navButton} onClick={() => setCurrentView('adminCalendar')}>Admin Log Calendar</button>}
        <button style={styles.navButton}>Log out</button>
      </div>
      <div style={styles.mainContent}>
        {currentView === 'overview' && (
          <div>
            <h2>User Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              {/* Profile form fields */}
            </form>
          </div>
        )}
        {currentView === 'logEntry' && userRole === 'employee' && (
          <div>
            {/* Log Entry Form */}
            <form onSubmit={handleLogEntrySubmit}>
              {/* Log entry form fields */}
            </form>
          </div>
        )}
        {currentView === 'loggedEntries' && (
          <div>
            <h2>Logged Entries</h2>
            {filteredEntries.map(entry => (
              <div key={entry.id}>
                {/* Display entry details */}
              </div>
            ))}
          </div>
        )}
        {currentView === 'adminCalendar' && userRole === 'admin' && (
          <div>
            <h2>Admin Log Calendar</h2>
            {/* Admin-specific view of the log calendar */}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    padding: '10px 20px',
    textAlign: 'center',
  },
  navigationBar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    padding: '10px 0',
  },
  navButton: {
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
  },
  mainContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
  profileDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  profilePlaceholder: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
  },
  profileName: {
    margin: '0',
    fontWeight: 'bold',
  },
};

export default CombinedDashboard;