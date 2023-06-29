import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/reducers/rockets/rocketsActions';
import RocketsList from './RocketsList';

const Rockets = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rockets.loading);
  const error = useSelector((state) => state.rockets.error);

  useEffect(() => {
    dispatch(fetchRockets());
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
      <RocketsList />
    </div>
  );
};

export default Rockets;
