import React from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import backofficeRoutes from '../routes/backofficeRoutes'

export const BackofficeScreen = () => {
    return (
        <div>
            <Container className="my-5 m-auto">
                <h1 className="text-center mb-4 ">
                    <strong>
                        Backoffice
                    </strong>
                </h1>
                <Row className="justify-content-center">
                    {
                        backofficeRoutes.map(item =>
                            item.principal &&
                            <Card
                                className="m-3 shadow"
                                style={{ width: '15rem',height:'13rem', border:'none', backgroundColor: item.color === 1 ? '#9AC9FB' : item.color === 2 ? '#FAFA88' : '#DB5752' }}
                                key={item.title}
                            >
                                <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                                    <Card.Title >
                                        {item.title}
                                    </Card.Title>
                                    <Card.Text>
                                    </Card.Text>
                                    <div>
                                        <Link to={`/backoffice${item.path}`}>
                                            <button className="btn btn-primary">
                                                Editar
                                            </button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}
