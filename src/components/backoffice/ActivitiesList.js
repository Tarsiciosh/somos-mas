import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getActivities } from '../../services/activities';
import SpinnerOng from '../SpinnerOng';

export default function ActivitiesList() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    getActivities().then((res) => {
      setActivities(res.data.data);
      setLoad(false);
    });
  }, []);

  return (
    <div>
      {isLoading ? (
        <SpinnerOng />
      ) : (
        <Container>
          <Container className='mt-3'>
            <h2 className='text-center'>Actividades</h2>
          </Container>
          <Container className='d-flex justify-content-end align-items-center'>
            <Link to='/backoffice/activities/create'>
              <Button variant='success' className='border-0 py-1'>
                <FontAwesomeIcon icon={faPlus} />
                <span
                  style={{
                    border: '1px solid white',
                    margin: '0 10px',
                  }}
                ></span>
                Crear
              </Button>
            </Link>
          </Container>
          <Container>
            <ListGroup>
              {activities?.map((activity) => {
                return (
                  <ListGroup.Item
                    key={activity.id}
                    className='d-flex justify-content-between align-items-center mb-3 border-top rounded shadow'
                  >
                    <img
                      src={
                        activity.image
                          ? activity.image
                          : 'https://www.alkemy.org/logo512.png'
                      }
                      alt='Imagen slide'
                      style={{
                        height: '70px',
                        width: '70px',
                        objectFit: 'cover',
                      }}
                      className='border rounded-circle'
                    />
                    <div>{activity.name}</div>
                    <div>
                      <Link to={`/backoffice/activities/edit/${activity.id}`}>
                        <Button variant='primary'>
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                      </Link>

                      <Button variant='danger'>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Container>
        </Container>
      )}
    </div>
  );
}
