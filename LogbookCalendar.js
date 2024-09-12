import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './LogbookCalendar.css';

const LogbookCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/logbook/entries');
        setEntries(response.data);
        setError(null);
      } catch (error) {
        setError('Failed to fetch logbook entries. Please try again later.');
        setEntries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const renderEntries = () => {
    const selectedDate = date.toISOString().split('T')[0];
    const dailyEntries = entries.filter(entry => entry.date === selectedDate);

    if (dailyEntries.length === 0) {
      return <p>No entries for this date.</p>;
    }

    return (
      <ul>
        {dailyEntries.map((entry, index) => (
          <li key={index}>{entry.description}</li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="calendar-container">
      <h1>Logbook Calendar</h1>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <div className="entries">
        <h2>Entries for {date.toDateString()}</h2>
        {renderEntries()}
      </div>
    </div>
  );
};

export default LogbookCalendar;