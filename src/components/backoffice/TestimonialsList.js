import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import SpinnerOng from '../SpinnerOng';
import { getOngApi } from '../../services/publicApiService';
import { TESTIMONIALS } from '../../services/apiRest';

export default function TestimonialsList() {
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setLoad] = useState(true);

  useEffect(() => {
    getOngApi(TESTIMONIALS).then((res) => {
      setTestimonials(res.data.data);
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
            <h2 className='text-center'>Testimonios</h2>
          </Container>
          <Container className='d-flex justify-content-end align-items-center'>
            <Link to='/backoffice/testimonials/create'>
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
              {testimonials?.map((testimonial) => {
                return (
                  <ListGroup.Item
                    key={testimonial.id}
                    className='d-flex justify-content-between align-items-center mb-3 border-top rounded shadow'
                  >
                    <img
                      src={
                        testimonial.image
                          ? testimonial.image
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
                    <div>{testimonial.name}</div>
                    <div>
                      <Link
                        to={`/backoffice/testimonials/edit/${testimonial.id}`}
                      >
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
