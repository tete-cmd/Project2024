import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('logEntry');
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
    };
    setLogEntries([...logEntries, newEntry]);
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

  const handleLogout = () => {
    // Clear authentication data if necessary
    navigate('/login')};

  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.header}>
        <h1>User Dashboard</h1>
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
        <button onClick={handleLogout} style={styles.navButton}>Log out</button>
      </div>
      <div style={styles.mainContent}>
        {currentView === 'overview' && (
          <div>
            <h2>User Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div style={styles.formGroup}>
                <label>Full Name:</label>
                <input type="text" name="fullName" required style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Job Title:</label>
                <input type="text" name="jobTitle" required style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Contact Number:</label>
                <input type="tel" name="contactNumber" required style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Email Address:</label>
                <input type="email" name="emailAddress" required style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Upload Profile Picture:</label>
                <input type="file" name="profilePicture" accept="image/*" style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Emergency Contact Name:</label>
                <input type="text" name="emergencyContactName" style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Relationship to Emergency Contact:</label>
                <input type="text" name="emergencyContactRelationship" style={styles.inputField} />
              </div>
              <div style={styles.formGroup}>
                <label>Emergency Contact Number:</label>
                <input type="tel" name="emergencyContactNumber" style={styles.inputField} />
              </div>
              <button type="submit" style={styles.saveButton}>Save</button>
            </form>
          </div>
        )}
        {currentView === 'logEntry' && (
          <div>
            <div style={styles.logEntryHeader}>
              <h2>Log Entry</h2>
            </div>
            <div style={styles.timeDisplay}>
              <h3>{currentTime.toUTCString().split(' GMT')[0]}Z</h3>
            </div>
            <form onSubmit={handleLogEntrySubmit}>
              <div style={styles.formGroup}>
                <label>Item:</label>
                <input
                  type="text"
                  name="item"
                  value={itemInput}
                  onChange={handleItemInputChange}
                  required
                  autoComplete="off"
                  style={styles.inputField}
                />
                {suggestions.length > 0 && (
                  <ul style={styles.suggestionList}>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={styles.suggestionItem}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={styles.formGroup}>
                <label>Maintenance Type:</label>
                <select
                  value={maintenanceType}
                  onChange={(e) => setMaintenanceType(e.target.value)}
                  required
                  style={styles.selectField}
                >
                  <option value="" disabled>Select Maintenance Type</option>
                  {maintenanceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label>Operational Comment:</label>
                <textarea name="operationalComment" required style={styles.textArea}></textarea>
              </div>
              <button type="button" style={styles.signatureButton}>Add Signature</button>
              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          </div>
        )}
        {currentView === 'loggedEntries' && (
          <div style={styles.entriesContainer}>
            <h2>Logged Entries</h2>
            {logEntries.map(entry => (
              <div key={entry.id} style={styles.entryCard}>
                <p>
                  <strong>
                    <span
                      onClick={() => {
                        setSelectedEntry(entry.id === selectedEntry ? null : entry.id);
                      }}
                      style={styles.entryTitle}
                    >
                      {entry.fullName} - {entry.title}
                    </span>
                  </strong>
                </p>
                {selectedEntry === entry.id && (
                  <div style={styles.entryDetails}>
                    <p><strong>Entry Number:</strong> {entry.id}</p>
                    <p><strong>Date:</strong> {entry.date}</p>
                    <p><strong>Time:</strong> {entry.time}</p>
                    <p><strong>Item:</strong> {entry.item}</p>
                    <p><strong>Maintenance Type:</strong> {entry.maintenanceType}</p>
                    <p><strong>Operational Comment:</strong> {entry.operationalComment}</p>
                    <p><strong>Submission Date:</strong> {entry.submissionDate}</p>
                    <button onClick={() => handleVerification(entry.id)} style={styles.verifyButton}>
                      {entry.verified ? 'Verified' : 'Verify Entry'}
                    </button>
                    <button onClick={() => handleEdit(entry.id)} style={styles.editButton}>Edit Entry</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileDisplay: {
    display: 'flex',
    alignItems: 'center',
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
    backgroundColor: '#ccc',
  },
  profileName: {
    marginLeft: '10px',
    fontWeight: 'bold',
  },
  navigationBar: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
  },
  navButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  mainContent: {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  formGroup: {
    marginBottom: '1px',
  },
  inputField: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  selectField: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textArea: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '80px',
  },
  suggestionList: {
    listStyleType: 'none',
    padding: '0',
    margin: '10px 0 0 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  suggestionItem: {
    padding: '8px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  signatureButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    marginRight: '10px',
  },
  verifyButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    marginLeft: '10px',
  },
  entriesContainer: {
    marginTop: '20px',
  },
  entryCard: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  entryTitle: {
    cursor: 'pointer',
    color: '#007BFF',
  },
  entryDetails: {
    marginTop: '10px',
    paddingLeft: '10px',
    borderLeft: '2px solid #007BFF',
  },
  logEntryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeDisplay: {
    textAlign: 'right',
    marginBottom: '10px',
  },
};

export default Dashboard;