import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { startRegister } from "../app/auth/actions";
import PopupTyC from "./organization/PopupTyC";
import './signUpForm.css'
import logoSomosMas from './logoSomosMas.png'
import logo from './logoSomosMas.png'
import HeaderPublic from './HeaderPublic'
import { Button } from "react-bootstrap"
import { Link } from 'react-router-dom'
import FooterPublico from "./footer/FooterPublico";

const validate = (values) => {
  const errors = {};
  /* Email */
  if (!values.email) {
    errors.email = "Required";
  }
  /* Password */
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
      values.password
    )
  ) {
    errors.password =
      "The password must contain at least one number, one letter and one symbol (for example: @ # $%)";
  }

  /* Confirm password */
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password not matched";
  }

  /* Confirm terms and conditions */
  if (!values.acceptTermAndConditions) {
    errors.acceptTermAndConditions = "Must accept terms and conditions to continue with registration"
  }
  return errors;
};

export default function SignupForm() {
  const history = useHistory()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      history.push('/')
    }
  }, [token, history])

  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTermAndConditions: false
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      const user = {
        name: values.name,
        email: values.email,
        password: values.password
      }
      dispatch(startRegister(user))
      resetForm()
    },
  });

  const logOut = () => {
    localStorage.removeItem("token")
    history.push("/")
  }

  const logout = <Button className="btn btn-primary btn-sm" onClick={logOut}>Cerrar Sesión</Button>
  const login = <Link to="/login" className="btn btn-outline-primary btn-sm">Iniciar Sesión</Link>
  const register = <Link to="/register" className=" mx-3 btn btn-outline-primary btn-sm">Registrarse</Link>

  return (
    <>
      <div>
        <div className="header overflow-hidden bg-white shadow-sm">
          <img src={logo} alt='Logo somos más' className='h-100' />
          <HeaderPublic />
          {(token) ? logout : login}
          {(!token) && register}
        </div>
        <div className='contenedor-register'>
          <div>
            <img src={logoSomosMas} alt='logo de somos mas' />
          </div>
          <h2 className='title-register'>Registrarse</h2>
          <form onSubmit={formik.handleSubmit} className='contenedor-register'>
            <div>
              <label htmlFor="name" className='label'>Nombre</label>
              <input
                placeholder='Usuario Alkemy'
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className='form-control input'
              />
            </div>
            <div>
              <label htmlFor="email" className='label'>Email</label>
              <input
                placeholder='usuario@alkemy.org'
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className='form-control input'
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='error'>{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className='label'>Contraseña</label>
              <input
                placeholder='**********'
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className='form-control input'
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='error'>{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label htmlFor="confirmPassword" className='label'>Repetir Contraseña</label>
              <input
                placeholder='**********'
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className='form-control input'
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className='error'>{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <div className='terminos'>
              <input
                name="acceptTermAndConditions"
                type="checkbox"
                onChange={formik.handleChange}
              />
              He leído y acepto los
              <PopupTyC className='popup' />
            </div>

            {formik.touched.acceptTermAndConditions && formik.errors.acceptTermAndConditions ? (
              <div className='error'>{formik.errors.acceptTermAndConditions}</div>
            ) : null}
            <button type="submit" className='btn-ingreso'>Registrarme</button>
          </form>
        </div>
        <div className="footer">
          <FooterPublico />
        </div>
      </div>
    </>
  );
}
