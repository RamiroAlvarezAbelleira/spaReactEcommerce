import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { createUser } from '../../redux/states/user';
import './login.css'

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let emailInput = useRef()
  let passwordInput = useRef()
  let errors = useRef()

  const {
    handleChange,
    handleBlurEmail,
    handleBlurPassword
} = useForm(initialForm, validateForm)

  const handleSubmit = () => {
    let email = emailInput.current.value;
    let password = passwordInput.current.value;
    let credentials = {email, password};
    fetch("http://localhost:3000/usuarios/ingresar", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(credentials)})
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          errors.current.innerText = 'Credenciales invalidas'
          console.log(data)
        } else {
          errors.current.innerText = ''
          console.log(data)
          dispatch(createUser({...data.data}))
          navigate('/')
        }
      })
  }



  return (
    <Form className='w-50 p-5 formMargin bg-white'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        ref={emailInput} 
        type="email" 
        placeholder="Email" 
        name='email'
        onChange={handleChange}
        onBlur={handleBlurEmail}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control 
        ref={passwordInput} 
        type="password" 
        placeholder="Contraseña" 
        name='password'
        onChange={handleChange}
        onBlur={handleBlurPassword} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordarme" />
        <Form.Text ref={errors} className="text-danger">
        </Form.Text>
      </Form.Group>
      <Form.Group className='w-100 d-flex justify-content-center'>
      <Button onClick={handleSubmit} className='w-25' variant="secondary">
        Submit
      </Button>
      </Form.Group>
    </Form>
  )
}

export default Login