import React, { useEffect } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchAsync,deleteMemberAsync} from '../../features/members/MembersSlice'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export const ListMembers = () => {
    const dispatch = useDispatch()
    const {values, status} = useSelector((state)=>state.members)

    useEffect(() => {
        dispatch(fetchAsync())
    }, []);

    return (
        <Container>
            <Container className="mt-3">
                <h2 className="text-center">Miembros</h2>
            </Container>
            <Container className="d-flex justify-content-end align-items-center">
                <Link to="/backoffice/members/create">
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
                {
                    values?.map(member => {
                        return (
                            <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 border-top rounded shadow" key={`member-${member.id}`}>
                                <div className="d-flex align-items-center">
                                    <img
                                    src={member.image ? member.image : "https://www.alkemy.org/logo512.png"}
                                    alt="Foto miembro perfil"
                                    style={{ height: "70px", width: "70px", objectFit: "cover" }}
                                    className="border rounded-circle"
                                    />
                                </div>
                                
                                <p>{member.name}</p>

                                <div>
                                    <Button>
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Button>
                                    <Button variant="danger" onClick={()=>dispatch(deleteMemberAsync(member.id))}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        )
                    })
                }
                </ListGroup>
            </Container>

        </Container>
    )
}


