import React, { useState, useEffect } from "react"
import SpinnerOng from "../SpinnerOng"
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from '../../features/us/UsSlice'
import { alert } from '../../services/alert'
// import { TwitterTweet, LinkedinProfile, TwitterButton } from "react-social-plugins"
import ReactHtmlParser from 'react-html-parser';
import { getMembers } from '../../services/miembros'
import './about.css'
import FooterPublico from "../footer/FooterPublico";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import logo from '../logoSomosMas.png'
import HeaderPublic from "../HeaderPublic";


export default function About() {
    const token = localStorage.getItem('token');
    const history = useHistory();

    const dispatch = useDispatch()
    const { values, status } = useSelector((state) => state.us)
    /* En values se encuentra la response de la peticion a /organization */
    const [load, setLoad] = useState(true)
    const [members, setMembers] = useState([])

    const getAboutUs = () => {
        try {
            dispatch(fetchAsync())
            setLoad(false)
        } catch (error) {
            alert('Error 404', 'Error al cargar la página nosotros, vuelva a intentarlo', 'error', 'Ok')
        }
    }
    useEffect(() => {
        getAboutUs()
        getMembers().then(res => setMembers(res.data))
    }, [])

    const logOut = () => {
        localStorage.removeItem("token")
        history.push("/")
    }

    const logout = <Button className="btn btn-primary btn-sm" onClick={logOut}>Cerrar Sesión</Button>
    const login = <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
    const register = <Link to="/register" className=" mx-3 btn btn-outline-primary btn-sm">Registrarse</Link>
    const backoffice = <Link to="/backoffice" className="btn btn-outline-danger btn-sm mx-3">Backoffice</Link>
    return (
        <>
            <div className="header overflow-hidden bg-white shadow-sm">
                <img src={logo} alt='Logo somos más' className='h-100' />
                <HeaderPublic />
                {(token) && backoffice}
                {(token) ? logout : login}
                {(!token) && register}
            </div>
            {load ? <SpinnerOng /> :
                <div>
                    <div className='textContainer'>
                        <h2>SOBRE NOSOTROS</h2>
                        {/* <LinkedinProfile
                            lang="en_US"
                            profileUrl='https://www.linkedin.com/company/linkedin/'
                            format="inline" // Or "hover"
                            text="Company name" // text to show in "hover" format
                        />
                        <TwitterButton
                            target="/"
                            text="Hello World"
                            type="Share"
                        />
                        <TwitterTweet
                            align='left'
                            coversation='none'
                            tweetId='1342961509807362054'
                            theme='light'
                            width={325}
                        /> */}

                        <>{ReactHtmlParser(values?.long_description)}</>
                    </div>
                    <div className='members'>
                        <h2>Miembros</h2>
                        <span>
                            {members.map(member => {
                                return (<Collaborators image={member.image} name={member.name} id={member.id} />)
                            })}
                        </span>
                    </div>
                </div>
            }
            <div className="footer">
                <FooterPublico />
            </div>
        </>
    )
}

const Collaborators = ({ image, name, id }) => {
    return (
        <div className='memberItem' key={id}>
            <img className='rounded-circle' src={image} alt={name} />
            <p>{name}</p>
        </div>
    )
}
