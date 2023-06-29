import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

const Profile = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);

  const reservedRocketIds = useMemo(() => {
    const storedIds = JSON.parse(localStorage.getItem('reservedRocketIds'));
    return storedIds || [];
  }, []);

  const reservedRockets = useMemo(
    () => rockets.filter((rocket) => reservedRocketIds.includes(rocket.id)),
    [rockets, reservedRocketIds],
  );

  const reservedMissions = useMemo(() => reservedRockets.map((rocket) => {
    const mission = missions.find((mission) => mission && mission.rocket_id === rocket.id);
    return mission ? { ...mission, rocket_name: rocket.name } : null;
  }), [reservedRockets, missions]);

  useEffect(() => {
    localStorage.setItem('reservedRocketIds', JSON.stringify(reservedRocketIds));
  }, [reservedRocketIds]);

  useEffect(() => () => {
    localStorage.setItem('reservedRocketIds', JSON.stringify(reservedRocketIds));
  }, [reservedRocketIds]);

  return (
    <Container className="profile">
      <Row>
        <Col>
          <h2>My Missions</h2>
          {joinedMissions.length > 0 || reservedMissions.length > 0 ? (
            <ul className="list-group">
              {joinedMissions.map((missionId) => {
                const mission = missions.find((mission) => mission
                && mission.mission_id === missionId);
                return mission ? (
                  <li key={mission.mission_id} className="list-group-item">
                    {mission.mission_name}
                    -
                    {mission.rocket_name}
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            <p>No reserved missions</p>
          )}
        </Col>
        <Col>
          <h2>Rockets</h2>
          {reservedRockets.length > 0 ? (
            <ul className="list-group">
              {reservedRockets.map((rocket) => (
                <li key={rocket.id} className="list-group-item">
                  {rocket.name}
                </li>
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
