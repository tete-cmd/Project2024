import React, { useState } from 'react';

const ARTCCLogbookForm = () => {
  const [flightDataPosition, setFlightDataPosition] = useState({
    aircraftId: '',
    flightPlan: '',
    routeInfo: '',
    currentPosition: '',
    altitude: ''
  });

  const [operationalLog, setOperationalLog] = useState({
    sectorBoundaries: '',
    trafficVolumes: '',
    controllerActions: '',
    equipmentOutages: ''
  });

  const [communicationLog, setCommunicationLog] = useState({
    frequency: '',
    time: '',
    messageContent: '',
    aircraftIdentification: ''
  });

  const handleFlightDataPositionChange = (e) => {
    const { name, value } = e.target;
    setFlightDataPosition({ ...flightDataPosition, [name]: value });
  };

  const handleOperationalLogChange = (e) => {
    const { name, value } = e.target;
    setOperationalLog({ ...operationalLog, [name]: value });
  };

  const handleCommunicationLogChange = (e) => {
    const { name, value } = e.target;
    setCommunicationLog({ ...communicationLog, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the submission logic here
    console.log('Flight Data Position:', flightDataPosition);
    console.log('Operational Log:', operationalLog);
    console.log('Communication Log:', communicationLog);
    // Reset the form after submission
    setFlightDataPosition({
      aircraftId: '',
      flightPlan: '',
      routeInfo: '',
      currentPosition: '',
      altitude: ''
    });
    setOperationalLog({
      sectorBoundaries: '',
      trafficVolumes: '',
      controllerActions: '',
      equipmentOutages: ''
    });
    setCommunicationLog({
      frequency: '',
      time: '',
      messageContent: '',
      aircraftIdentification: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style ={{ marginTop:"150px"}}>
      <fieldset>
        <legend>Flight Data Position (FDP)</legend>
        <label>
          Aircraft Identification:
          <input
            type="text"
            name="aircraftId"
            value={flightDataPosition.aircraftId}
            onChange={handleFlightDataPositionChange}
            required
          />
        </label>

        <label>
          Flight Plan:
          <textarea
            name="flightPlan"
            value={flightDataPosition.flightPlan}
            onChange={handleFlightDataPositionChange}
            rows={4}
            required
          />
        </label>

        <label>
          Route Information:
          <textarea
            name="routeInfo"
            value={flightDataPosition.routeInfo}
            onChange={handleFlightDataPositionChange}
            rows={4}
            required
          />
        </label>

        <label>
          Current Position:
          <textarea
            name="currentPosition"
            value={flightDataPosition.currentPosition}
            onChange={handleFlightDataPositionChange}
            rows={4}
            required
          />
        </label>

        <label>
          Altitude:
          <input
            type="text"
            name="altitude"
            value={flightDataPosition.altitude}
            onChange={handleFlightDataPositionChange}
            required
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Operational Log</legend>
        <label>
          Sector Boundaries:
          <textarea
            name="sectorBoundaries"
            value={operationalLog.sectorBoundaries}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>

        <label>
          Traffic Volumes:
          <textarea
            name="trafficVolumes"
            value={operationalLog.trafficVolumes}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>

        <label>
          Controller Actions:
          <textarea
            name="controllerActions"
            value={operationalLog.controllerActions}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>

        <label>
          Equipment Outages:
          <textarea
            name="equipmentOutages"
            value={operationalLog.equipmentOutages}
            onChange={handleOperationalLogChange}
            rows={4}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Communication Log</legend>
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default ARTCCLogbookForm;