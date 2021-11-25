import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useDispatch } from 'react-redux'
import { startLogin } from '../app/auth/actions'
import { useHistory, withRouter } from 'react-router'
import { useSelector } from 'react-redux'
// import logoSomosMas from '../../src/logoSomosMas.png'
import './loginForm.css'
import HeaderPublic from './HeaderPublic'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import logo from './assets/logoSomosMas.png'
import FooterPublico from './footer/FooterPublico'


const LoginForm = (props) => {
    const token = localStorage.getItem('token');
    const history = useHistory();

    const activo = useSelector(store => store.auth.token.data)
    const dispatch = useDispatch()

    useEffect(() => {
        const verificarUsuario = () => {
            if (localStorage.getItem('token')) {
                props.history.push('/')
            } else {
                props.history.push('/login')
            }
        }
        verificarUsuario()
    }, [activo, props.history])

    const logOut = () => {
        localStorage.removeItem("token")
        history.push("/")
    }

    const logout = <Button className="btn btn-primary" onClick={logOut}>Cerrar Sesión</Button>
    const login = <Link to="/login" className="btn btn-outline-primary">Iniciar Sesión</Link>
    const register = <Link to="/register" className=" mx-3 btn btn-outline-primary">Registrarse</Link>
    const donate = <Link to="/donar" className="btn btn-outline-primary">Donar</Link>

    return (

        <div className=''>
            <div className="header overflow-hidden bg-white shadow-sm">
                <img src={logo} alt='Logo somos más' className='h-100' />
                {(token) && donate}
                <HeaderPublic />
                {(token) ? logout : login}
                {(!token) && register}
            </div>
            <div className='contenedor-login'>
                <div>
                    {/* <img src={logoSomosMas} alt='logo de somos mas' /> */}
                    <h2>Iniciar Sesión</h2>
                </div>
                <div className=''>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validate={(value) => {
                            let errores = {}
                            //Email validation
                            if (!value.email) {
                                errores.email = 'Por favor ingrese su email.'
                            } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value.email)) {
                                errores.email = 'El correo solo puede contener letras, números, puntos, guiones y guión bajo.'
                            }
                            //Password validation
                            if (!value.password) {
                                errores.password = 'Por favor ingrese su contraseña.'
                            } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(value.password)) {
                                errores.password = 'La contraseña debe tener una longitud mínima de 6 caraceteres, contener al menos un número, una letra y un símbolo.'
                            }
                            return errores
                        }}
                        onSubmit={(value, { resetForm }) => {
                            let userData = value;
                            dispatch(startLogin(userData))
                            resetForm()
                        }}
                    >
                        {({ errors }) => (
                            <Form>
                                <div className='contenedor-label-input'>
                                    <label htmlFor='email' className='label'>Email</label>
                                    <Field
                                        className='form-control input'
                                        type='email'
                                        id='email'
                                        name='email'
                                        placeholder='correo@correo.com'
                                    />
                                    <ErrorMessage name='email' component={() => (
                                        <div className='error'>{errors.email}</div>
                                    )} />
                                </div>
                                <div className='label-input'>
                                    <label htmlFor='password' className='label'>Contraseña</label>
                                    <Field
                                        className='form-control input'
                                        type='password'
                                        id='password'
                                        name='password'
                                        placeholder='**********'
                                    />
                                    <ErrorMessage name='password' component={() => (
                                        <div className='error'>{errors.password}</div>
                                    )} />
                                </div>
                                <button type='submit' className='btn-ingreso'>Ingresar</button>
                            </Form>
                        )}
                    </Formik>
                    <div className='div-link'><a className='link' href='/register'>Registrarme</a></div>
                </div>
            </div>
            <div className="footer">
                <FooterPublico />
            </div>
        </div>

    )
}

export default withRouter(LoginForm)
