import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [logEntries, setLogEntries] = useState([]);
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogEntries = async () => {
      try {
        const response = await axios.get('http://localhost:3000/log-entries');
        setLogEntries(response.data);
      } catch (error) {
        console.error('Error fetching log entries:', error);
      }
    };

    fetchLogEntries();
  }, []);

  const filteredEntries = logEntries
    .filter(entry =>
      entry.userName.toLowerCase().includes(filter.toLowerCase()) ||
      entry.surname.toLowerCase().includes(filter.toLowerCase()) ||
      entry.item.toLowerCase().includes(filter.toLowerCase()) ||
      entry.maintenanceType.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortOrder === 'name') {
        return a.surname.localeCompare(b.surname);
      }
      return 0;
    });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good day';
    return 'Good evening';
  };

  const handleLogout = () => {
    // Clear authentication data if necessary
    navigate('/login'); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>{getGreeting()}, Welcome to the Admin Dashboard</h1>
        <p style={styles.time}>{new Date().toLocaleTimeString()}</p>
        <div style={styles.profileSection}>
          <div style={styles.profileImage}></div>
          <p style={styles.profileName}>Admin Name</p>
        </div>
      </header>
      
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem} onClick={() => setCurrentView('dashboard')}>Dashboard</li>
          <li style={styles.navItem} onClick={() => setCurrentView('logbook')}>Logbook Calendar</li>
        </ul>
        <button onClick={handleLogout} style={styles.logoutButton}>Log out</button>
      </nav>
      
      <main style={styles.main}>
        {currentView === 'dashboard' && (
          <div style={styles.dashboard}>
            <h2>Admin Dashboard</h2>
            <p>Manage log entries and view detailed reports.</p>
          </div>
        )}

        {currentView === 'logbook' && (
          <div style={styles.logbook}>
            <h2>Logbook Calendar</h2>
            <input
              type="text"
              placeholder="Filter entries"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={styles.filterInput}
            />
            <div style={styles.sortOptions}>
              <label>
                Sort by:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={styles.select}>
                  <option value="date">Date</option>
                  <option value="name">User Name</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="complaints">Complaints</option>
                </select>
              </label>
            </div>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>User Number</th>
                  <th>Full Name</th>
                  <th>Last Name</th>
                  <th>Entry Number</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.length === 0 ? (
                  <tr>
                    <td colSpan="6">No entries found.</td>
                  </tr>
                ) : (
                  filteredEntries.map(entry => (
                    <tr key={entry.id} onClick={() => setSelectedEntry(entry)} style={styles.tableRow}>
                      <td>{entry.userNumber}</td>
                      <td>{entry.userName}</td>
                      <td>{entry.surname}</td>
                      <td>{entry.id}</td>
                      <td>{entry.date}</td>
                      <td>{entry.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {selectedEntry && (
              <div style={styles.entryDetails}>
                <h3>Log Entry Details</h3>
                <p><strong>User:</strong> {selectedEntry.userName} {selectedEntry.surname}</p>
                <p><strong>Entry Number:</strong> {selectedEntry.id}</p>
                <p><strong>Date:</strong> {selectedEntry.date}</p>
                <p><strong>Time:</strong> {selectedEntry.time}</p>
                <p><strong>Item:</strong> {selectedEntry.item}</p>
                <p><strong>Maintenance Type:</strong> {selectedEntry.maintenanceType}</p>
                <p><strong>Operational Comment:</strong> {selectedEntry.operationalComment}</p>
                <p><strong>Submission Date:</strong> {selectedEntry.submissionDate}</p>
                <button onClick={() => setSelectedEntry(null)} style={styles.closeButton}>Close</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '250px 1fr',
    height: '100vh',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f8f9fa',
  },
  header: {
    gridColumn: '1 / span 2',
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  time: {
    fontSize: '1rem',
    marginTop: '10px',
  },
  profileSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
  },
  profileImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#ddd',
    marginRight: '10px',
  },
  profileName: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  nav: {
    backgroundColor: '#343a40',
    padding: '20px',
    color: '#ffffff',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
  },
  navItem: {
    marginBottom: '10px',
    cursor: 'pointer',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#495057',
    textAlign: 'center',
    transition: 'background 0.3s ease',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    alignSelf: 'center',
    marginTop: 'auto',
  },
  main: {
    padding: '20px',
    overflowY: 'auto',
  },
  dashboard: {
    textAlign: 'center',
    padding: '50px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  logbook: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  filterInput: {
    padding: '10px',
    fontSize: '1rem',
    marginBottom: '20px',
    width: '100%',
    borderRadius: '5px',
    border: '1px solid #ced4da',
    boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  sortOptions: {
    marginBottom: '20px',
  },
  select: {
    marginLeft: '10px',
    padding: '5px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
  },
  tableRow: {
    borderBottom: '1px solid #dee2e6',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  entryDetails: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
};

export default AdminDashboard;