import axios from "axios"
import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { COMMENTS } from "../../../services/apiRest"
import { Skeleton } from "../../Skeleton"

export default function Comments() {
    const [comments, setComments] = useState([])
    const [isLoading, setLoad] = useState(true)

    const setInitialValues = async () => {
        if (!comments.length) {
            await axios.get(`${COMMENTS}`)
                .then(response => {
                    let data = response.data.data
                    setComments(data);
                    setLoad(false)
                    console.log('data received')
                })
        } else {
            setLoad(false)
        }
    }

    useEffect(() => {
        window.onscroll = function () {
            // Obtenemos la posicion del scroll en pantalla
            var scroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (scroll > 350) {
                setTimeout(() => {
                    setInitialValues()
                }, 3000)
            }
        }
    }, [comments.length])

    return (
        <>
            <div className="mb-5">
                {isLoading ?
                    <div className="d-flex">
                        <div className="mt-3">
                            <Skeleton width="100px" height="100px" variant="circular" />
                        </div>
                        <div style={{ width: "100%" }} className="d-flex justify-content-center flex-wrap flex-column mt-3">
                            <Skeleton width="40%" variant="rectangular" />
                            <Skeleton width="40%" variant="rectangular" />
                            <Skeleton width="40%" variant="rectangular" />
                            <Skeleton width="40%" variant="rectangular" />
                        </div>
                    </div>
                    :
                    <div className="d-flex justify-content-center flex-wrap">

                        {comments.map((comentario) => (
                            <Card key={`comentario-${comentario.id}`} style={{ width: '18rem' }} >
                                <Card.Img variant="top" src={`${comentario.image}`} />
                                <Card.Body>
                                    <Card.Title>{comentario.name}</Card.Title>
                                    <Card.Text>
                                        {comentario.content.slice(3, -4)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        )).slice(8, 12)
                        }
                    </div>}

            </div>
        </>
    )
}