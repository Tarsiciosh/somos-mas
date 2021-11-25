import React, { useEffect, useState } from "react"
import { Button,Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import { deleteNewsPublicApi, getNewsPublicApi } from "../services/newsRequests"
import "./assets/newsList.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NewsList() {
    const [news, setNews] = useState([]);
    const getNews = async () => {
        const response = await getNewsPublicApi()
        setNews(response.data.data)
    }
    const handleDelete = async (event) => {
        const newsId = event
        const confirmar = window.confirm("Esta seguro que quiere eliminar?")
        if (confirmar) {
            try {
                await deleteNewsPublicApi(newsId)
                getNews()
            } catch (error) {
                alert("Error", "Se produjo un error", "error", "Salir")
            }
        } else {
            alert("el usuario no fue eliminado")
        }
    }
    useEffect(() => {
        if (!news.length) {
            getNews();
        }
    }, [news]);

    return (
        <Container>
            <Container className="mt-3">
                <h2 className="text-center">Novedades</h2>
            </Container>
            <Container className="d-flex justify-content-end align-items-center">
                <Link to="/backoffice/news/create">
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
                {news.map((noticia) => (
                    <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3 border-top rounded shadow" key={`new-${noticia.id}`}>
                            <div className="d-flex align-items-center">
                                <img
                                src={noticia.image ? noticia.image : "https://www.alkemy.org/logo512.png"}
                                alt="Imagen novedad"
                                style={{ height: "70px", width: "70px", objectFit: "cover" }}
                                className="border rounded-circle"
                                />
                            </div>
                            <div className='d-flex'>
                                <p>{noticia.id}</p>
                                <p>{noticia.name}</p>
                                <p>{noticia.created_at.slice(0, -8).replace("T", " - ")}</p> 
                            </div>                    
                            
                            <div>
                                <Link to={`/backoffice/news/create/${noticia.id}`}>
                                    <Button value={noticia.id}>
                                        <FontAwesomeIcon icon={faPen}/>
                                    </Button>
                                </Link>
                                
                                <Button variant="danger" value={noticia.id}onClick={()=>handleDelete(noticia.id)}>
                                    <FontAwesomeIcon icon={faTrash}/>
                                </Button>
                            </div>
                    </ListGroup.Item>
                ))}
                </ListGroup>
            </Container>
        </Container>
    )
}
