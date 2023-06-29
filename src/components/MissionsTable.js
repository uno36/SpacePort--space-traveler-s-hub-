import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';

const MissionsTable = () => {
  const missions = useSelector((state) => state.missions.missions);

  return (
    <Container fluid>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="Mission">Mission</th>
            <th>Description</th>
            <th className="Status">Status</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td className="status-column">
                <Button variant="secondary rounded-1">NOT A MEMBER</Button>
              </td>
              <td className="action-column">
                <Button className="btn btn-outline-dark rounded-0">Join Mission</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default MissionsTable;
