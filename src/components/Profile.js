import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const missions = useSelector((state) => state.missions.missions);

  const reservedRocketIds = useMemo(
    () => JSON.parse(localStorage.getItem('reservedRocketIds')) || [],
    [],
  );

  const reservedRockets = rockets.filter((rocket) => reservedRocketIds.includes(rocket.id));
  const reservedMissions = reservedRockets.map((rocket) => {
    const mission = missions.find((mission) => mission.rocket_id === rocket.id);
    return mission ? { ...mission, rocket_name: rocket.name } : null;
  });

  useEffect(() => {
    localStorage.setItem('reservedRocketIds', JSON.stringify(reservedRocketIds));
  }, [reservedRocketIds]);

  return (
    <Container>
      <Row>
        <Col>
          <h2>My Missions</h2>
          {reservedMissions.length > 0 ? (
            <ul>
              {reservedMissions.map((mission) => (
                <li key={mission && mission.id}>
                  {mission && mission.mission_name}
                  -
                  {mission && mission.rocket_name}
                </li>
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
                <li key={rocket.id}>{rocket.name}</li>
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
