import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Badge } from 'react-bootstrap';
import { selectRocket, reserveRocket } from '../redux/reducers/rockets/rocketsActions';

const RocketsList = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const dispatch = useDispatch();

  const handleRocketSelection = (rocket) => {
    dispatch(selectRocket(rocket));
  };

  const handleReservation = (rocketId, reserved) => {
    if (reserved) {
      dispatch(reserveRocket(rocketId)); // Cancel reservation
    } else {
      dispatch(reserveRocket(rocketId)); // Reserve rocket
    }
  };

  return (
    <Container className="rocketlist-container">
      <div className="rocket-cards">
        {rockets.map((rocket) => (
          <Card key={rocket.id} className="mb-3">
            <div className="card-body">
              <div className="card-image">
                <Card.Img src={rocket.flickr_images[0]} />
              </div>
              <div className="card-content">
                <h3>{rocket.name}</h3>
                <Card.Title>{rocket.rocket_name}</Card.Title>
                <Card.Text className="badge-desc">
                  {rocket.reserved && <Badge className="badge btn btn-info">Reserved</Badge>}
                  {rocket.description}
                </Card.Text>
                <button
                  type="submit"
                  className={`btn ${rocket.reserved ? 'btn-outline-danger' : 'btn-primary'} card-button`}
                  onClick={() => handleReservation(rocket.id, rocket.reserved)}
                >
                  {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default RocketsList;
