import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const missions = useSelector((state) => state.missions.missions);

  const reservedRockets = rockets.filter((rocket) => rocket.reserved);

  const reservedMissions = reservedRockets.map((rocket) => missions
    .find((mission) => mission.rocket_id === rocket.id));

  return (
    <Container>
      <Row>
        <Col>
          <h2>My Missions</h2>
          {reservedMissions.length > 0 ? (
            <ul>
              {reservedMissions.map((mission) => (
                <li key={mission.id}>{mission.mission_name}</li>
              ))}
            </ul>
          ) : (
            <p>No reserved missions</p>
          )}
        </Col>
        <Col>
          <h2>Rockets</h2>
          {reservedRockets.length > 0 ? (
            <ul>
              {reservedRockets.map((rocket) => (
                <li key={rocket.id}>{rocket.rocket_name}</li>
              ))}
            </ul>
          ) : (
            <p>No reserved rockets</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
