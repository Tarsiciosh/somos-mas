import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsync } from '../../features/users/UserSlice'
import SpinnerOng from '../SpinnerOng'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";

const UserList = () => {
    const [isLoading, setLoad] = useState(true)

    const { id } = useParams()


    const dispatch = useDispatch();
    const { values } = useSelector((state) => state.users)
    useEffect(() => {
        dispatch(fetchAsync())
        if (values) { setLoad(false) }
    }, [])

    return (
        <div>{
            isLoading ? <SpinnerOng />
                :
                <Container>
                    <Container className="mt-3">
                        <h2 className="text-center">Usuarios</h2>
                    </Container>
                    <Container className="d-flex justify-content-end align-items-center">
                        <Link to='/backoffice/users/create'>
                            <Button variant="success" className="border-0 py-1">
                                <FontAwesomeIcon icon={faPlus} />
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
                            {(values?.map(user => (
                                <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 border-top rounded shadow" key={user.id}>
                                    <p>{user.name}</p>
                                    <p>{user.email}</p>
                                    <div>
                                        <Link to={`/backoffice/users/create/${user.id}`}>
                                            <Button value={`${user.id}`}>
                                                <FontAwesomeIcon icon={faPen} />
                                            </Button>
                                        </Link>
                                        <Button variant="danger">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            )))}
                        </ListGroup>
                    </Container>
                </Container>
        }</div>
    )
}

export default UserList
