import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Button } from 'react-bootstrap';
import { joinMission, leaveMission } from '../redux/reducers/missions/missionsActions';

const MissionsTable = () => {
  const missions = useSelector((state) => state.missions.missions);
  const joinedMissions = useSelector((state) => state.missions.joinedMissions);
  const dispatch = useDispatch();
  const isMember = (missionId) => joinedMissions.includes(missionId);
  const handleJoinMission = (missionId) => {
    dispatch(joinMission(missionId));
  };
  const handleLeaveMission = (missionId) => {
    dispatch(leaveMission(missionId));
  };
  const getMembershipStatus = (missionId) => {
    if (isMember(missionId)) {
      return (
        <Button variant="success rounded-1" onClick={() => handleLeaveMission(missionId)}>
          ACTIVE MEMBER
        </Button>
      );
    }
    return (
      <Button variant="secondary rounded-1" onClick={() => handleJoinMission(missionId)}>
        NOT A MEMBER
      </Button>
    );
  };
  const getActionColumn = (missionId) => {
    if (isMember(missionId)) {
      return (
        <Button
          className="btn btn-outline-danger rounded-0"
          onClick={() => handleLeaveMission(missionId)}
        >
          Leave Mission
        </Button>
      );
    }
    return (
      <Button
        className="btn btn-outline-dark rounded-0"
        onClick={() => handleJoinMission(missionId)}
      >
        Join Mission
      </Button>
    );
  };
  return (
    <Container fluid>
      <Table striped bordered>
        <thead>
          <tr>
            <th className="Mission">Mission</th>
            <th>Description</th>
            <th className="Status">Status</th>
            <th className="Action">Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td className="status-column">{getMembershipStatus(mission.mission_id)}</td>
              <td className="action-column">{getActionColumn(mission.mission_id)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
export default MissionsTable;
