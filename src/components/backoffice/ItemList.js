import React from 'react'
import { Button, ListGroup} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ItemList = ({name, date, image }) => {
    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 border-top rounded shadow">                              
                <img
                    src={image ? image: "https://www.alkemy.org/logo512.png"}
                    alt="Imagen slide"
                    style={{ height: "70px", width: "70px", objectFit: "cover" }}
                    className="border rounded-circle"
                />
                <div>{name}</div>
                <div>{date}</div>
                
                <div>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPen}/>
                    </Button>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faTrash}/>
                    </Button>
                </div>
        </ListGroup.Item>
    )
}
