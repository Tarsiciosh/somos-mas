import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, ListGroup, Button, Spinner } from "react-bootstrap";
import { deleteSlideAsync, fetchAsync } from "../../features/slides/SlidesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SlidesList() {
  const dispatch = useDispatch();
  const {values, status} = useSelector((state) => state.slides)
 const [isLoading, setLoad] = useState(true)

  const deleteGlobalSlide = (id) => {
  dispatch(deleteSlideAsync(id))
  };

  const editSlide = (slide) => {
    /* Implement this function */
    console.log(slide.order);
  };

  useEffect(() => {
    dispatch(fetchAsync())
    setLoad(false)
  }, []);

  return (
    <div>
      {
        isLoading ? <Spinner variant='dark' animation='grow'/>
        :

        <Container>
        <Container className="mt-3">
          <h2 className="text-center">Slides</h2>
        </Container>

        <Container className="d-flex justify-content-end align-items-center">
          <Link to="/backoffice/slides/create">
            <Button variant="success" className="border-0 py-1">
            <FontAwesomeIcon icon={faPlus}/>
              <span
                style={{
                  border: "1px solid white",
                  margin: "0 10px",
                }}
              ></span>
              Crear
            </Button>
          </Link>
        </Container>

        <Container>
          <ListGroup>
            {values?.map((slide) => {
              return (
                <Slide
                  key={slide.id}
                  slide={slide}
                  deleteGlobalSlide={deleteGlobalSlide}
                  editSlide={editSlide}
                />
              );
            })}
          </ListGroup>
        </Container>
      </Container>
      }
    </div>

  );
}

const Slide = ({ slide, deleteGlobalSlide, editSlide }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 border-top rounded shadow">
      <div className="d-flex align-items-center">
        <img
          src={slide.image ? slide.image : "https://www.alkemy.org/logo512.png"}
          alt="Imagen slide"
          style={{ height: "70px", width: "70px", objectFit: "cover" }}
          className="border rounded-circle"
        />
        <p>{slide.title}</p>
      </div>

      <p>{slide.order}</p>

      <div>
        <Button onClick={() => editSlide(slide)}>
          <FontAwesomeIcon icon={faPen}/>
        </Button>
        <Button variant="danger" onClick={() => deleteGlobalSlide(slide.id)}>
        <FontAwesomeIcon icon={faTrash}/>
        </Button>
      </div>
    </ListGroup.Item>
  );
};
