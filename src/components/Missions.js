import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMissions } from '../redux/reducers/missions/missionsActions';
import MissionsTable from './MissionsTable';

const Missions = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.missions.loading);
  const error = useSelector((state) => state.missions.error);

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  return (
    <div>
      <MissionsTable />
    </div>
  );
};

export default Missions;
