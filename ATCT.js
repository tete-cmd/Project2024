import React, { useState } from 'react';

const ATCPLogbookForm = () => {
  const [flightProgressStrip, setFlightProgressStrip] = useState({
    flightNumber: '',
    aircraftType: '',
    departureTime: '',
    arrivalTime: '',
    assignedAltitude: '',
    clearanceInfo: ''
  });

  const [communicationLog, setCommunicationLog] = useState({
    time: '',
    frequency: '',
    messageContent: '',
    aircraftIdentification: ''
  });

  const [operationalLog, setOperationalLog] = useState({
    shiftChanges: '',
    equipmentMalfunctions: '',
    operationalUpdates: ''
  });

  const handleFlightProgressStripChange = (e) => {
    const { name, value } = e.target;
    setFlightProgressStrip({ ...flightProgressStrip, [name]: value });
  };

  const handleCommunicationLogChange = (e) => {
    const { name, value } = e.target;
    setCommunicationLog({ ...communicationLog, [name]: value });
  };

  const handleOperationalLogChange = (e) => {
    const { name, value } = e.target;
    setOperationalLog({ ...operationalLog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission logic here
    console.log('Flight Progress Strip:', flightProgressStrip);
    console.log('Communication Log:', communicationLog);
    console.log('Operational Log:', operationalLog);
    // Reset the form after submission
    setFlightProgressStrip({
      flightNumber: '',
      aircraftType: '',
      departureTime: '',
      arrivalTime: '',
      assignedAltitude: '',
      clearanceInfo: ''
    });
    setCommunicationLog({
      time: '',
      frequency: '',
      messageContent: '',
      aircraftIdentification: ''
    });
    setOperationalLog({
      shiftChanges: '',
      equipmentMalfunctions: '',
      operationalUpdates: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style ={{ marginTop:"150px"}}>
      <fieldset>
        <legend>Flight Progress Strip</legend>
        <label>
          Flight Number:
          <input
            type="text"
            name="flightNumber"
            value={flightProgressStrip.flightNumber}
            onChange={handleFlightProgressStripChange}
            required
          />
        </label>

        <label>
          Aircraft Type:
          <input
            type="text"
            name="aircraftType"
            value={flightProgressStrip.aircraftType}
            onChange={handleFlightProgressStripChange}
            required
          />
        </label>

        <label>
          Departure Time:
          <input
            type="datetime-local"
            name="departureTime"
            value={flightProgressStrip.departureTime}
            onChange={handleFlightProgressStripChange}
            required
          />
        </label>

        <label>
          Arrival Time:
          <input
            type="datetime-local"
            name="arrivalTime"
            value={flightProgressStrip.arrivalTime}
            onChange={handleFlightProgressStripChange}
            required
          />
        </label>

        <label>
          Assigned Altitude:
          <input
            type="text"
            name="assignedAltitude"
            value={flightProgressStrip.assignedAltitude}
            onChange={handleFlightProgressStripChange}
            required
          />
        </label>

        <label>
          Clearance Information:
          <textarea
            name="clearanceInfo"
            value={flightProgressStrip.clearanceInfo}
            onChange={handleFlightProgressStripChange}
            rows={4}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Communication Log</legend>
        <label>
          Time of Communication:
          <input
            type="datetime-local"
            name="time"
            value={communicationLog.time}
            onChange={handleCommunicationLogChange}
            required
          />
        </label>

        <label>
          Frequency:
          <input
            type="text"
            name="frequency"
            value={communicationLog.frequency}
            onChange={handleCommunicationLogChange}
            required
          />
        </label>

        <label>
          Content of Message:
          <textarea
            name="messageContent"
            value={communicationLog.messageContent}
            onChange={handleCommunicationLogChange}
            rows={4}
            required
          />
        </label>

        <label>
          Aircraft Identification:
          <input
            type="text"
            name="aircraftIdentification"
            value={communicationLog.aircraftIdentification}
            onChange={handleCommunicationLogChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Operational Log</legend>
        <label>
          Shift Changes:
          <textarea
            name="shiftChanges"
            value={operationalLog.shiftChanges}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>

        <label>
          Equipment Malfunctions:
          <textarea
            name="equipmentMalfunctions"
            value={operationalLog.equipmentMalfunctions}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>

        <label>
          Operational Updates:
          <textarea
            name="operationalUpdates"
            value={operationalLog.operationalUpdates}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ATCPLogbookForm;