import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card } from 'react-bootstrap';
import { selectRocket } from '../redux/reducers/rockets/rocketsActions';

const RocketsList = () => {
  const rockets = useSelector((state) => state.rockets.rockets);
  const dispatch = useDispatch();
  const handleRocketSelection = (rocket) => {
    dispatch(selectRocket(rocket));
  };
  return (
    <Container>
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
                <Card.Text>{rocket.description}</Card.Text>
                <button
                  type="submit"
                  className="btn btn-primary card-button"
                  onClick={() => handleRocketSelection(rocket.id)}
                  disabled={rocket.reserved}
                >
                  {rocket.reserved ? 'Reserved' : 'Reserve Rocket'}
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
