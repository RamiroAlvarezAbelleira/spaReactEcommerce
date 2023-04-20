import { useRef } from 'react';
import { Form, Button, Row, Col, Badge } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm';
import { MoonLoader } from 'react-spinners'
import './login.css'
import image from '../../assets/images/logo-BM.png'
import { Link } from 'react-router-dom';

const initialForm = {
  email: '',
  password: ''
}

const validateForm = (form) => {
  let errors = {};

  if (!form.email.trim()) {
    errors.email = "El campo no puede estar vacio";
  } else if (false) {
    errors.email = "Ingrese un formato valido";
  } else {
    delete errors.email;
  }

  if (!form.password.trim()) {
    errors.password = "El campo no puede estar vacio";
  } else if (form.password.length < 8) {
    errors.password = "La contraseña debe contener 8 caracteres como mínimo";
  } else {
    delete errors.password
  }

  return errors
}

const Login = () => {
  let emailInput = useRef()
  let passwordInput = useRef()

  const {
    loading,
    response,
    formErrors,
    handleChange,
    handleBlur,
    handleLogin
  } = useForm(initialForm, validateForm)



  return (
    <Row className='login-container'>
      <Col xl={8} lg={6} className='d-flex flex-column mt-5 pt-5 align-items-center'>
          <img src={image} className='w-25' alt='logo bicimundo' />
          <h1>Bienvenido a Bicimundo</h1>
          <h4>Cree su cuenta gratuita ahora!</h4>
      </Col>
      <Col xl={4} lg={6}>
        <div className='bg-white h-100 d-flex align-items-center'>
          <Form className='login-form p-5 bg-white w-100'>
            <h2>Ingresa!</h2>
            {loading ?
                <div className='login-spinner'>
                    <MoonLoader color={'#b9b9b9'} loading={true} size={40} margin={10}/>
                </div>
                :
                <></>
            }
            {response ?
                <div className='login-spinner'>
                    <Badge className='fs-5 p-2' pill bg="success">Bienvenido!</Badge>
                </div>
                :
                <></>
            }
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                ref={emailInput}
                type="email"
                placeholder="Email"
                name='email'
                onChange={handleChange}
                onBlur={handleBlur} />
              {formErrors?.email && <Form.Text className='registerError'>{formErrors?.email}</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                ref={passwordInput}
                type="password"
                placeholder="Contraseña"
                name='password'
                onChange={handleChange}
                onBlur={handleBlur} />
              {formErrors?.password && <Form.Text className='registerError'>{formErrors?.password}</Form.Text>}
            </Form.Group>
            <Form.Group className="my-5" controlId="formBasicCheckbox">
              <Form.Text>No tenes una cuenta? <Link to={'/registro'}>Registrate!</Link></Form.Text>
            </Form.Group>
            <Form.Group className='w-100 d-flex justify-content-center'>
              <Button onClick={handleLogin} className='w-25' variant="secondary">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Col>
    </Row>
  )
}

export default Login