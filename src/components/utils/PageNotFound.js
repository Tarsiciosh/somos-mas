import React from "react"
import "../utils/pageNotFound.css"
import { Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Layout } from "../layout/Layout"

export default function PageNotFound(logOut) {
    return (
        <>
            <Layout logOut={logOut} >
                <div className="align-content">
                    <div className="d-flex justify-content-center">
                        <p className="notFound-4">4</p>
                        <p className="notFound-0">0</p>
                        <p className="notFound-final4">4</p>
                    </div>
                    <h3>Página no encontrada</h3>
                    <h4>Parece que te has equivocado de camino. No te preocupes... Nos pasa a la mayoría.</h4>
                    <div className="text-center mt-4"><Link to="/"><Button variant="outline-warning">Ir al inicio</Button></Link></div>
                </div>
            </Layout>
        </>
    )
}