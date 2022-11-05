import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../redux/states/user';
import './login.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let emailInput = useRef()
  let passwordInput = useRef()
  let errors = useRef()

  const handleSubmit = () => {
    let email = emailInput.current.value;
    let password = passwordInput.current.value;
    let credentials = {email, password};
    console.log(credentials)
    fetch("http://localhost:3000/usuarios/ingresar", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify(credentials)})
      .then(response => response.json())
      .then(data => {
        if(data.error) {
          errors.current.innerText = 'Credenciales invalidas'
        } else {
          errors.current.innerText = ''
          console.log(data.data)
          dispatch(createUser({...data.data}))
          navigate('/')
        }
      })
  }



  return (
    <Form className='w-50 p-5 formMargin bg-white'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control ref={emailInput} type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control ref={passwordInput} type="password" placeholder="Contraseña" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordarme" />
        <Form.Text ref={errors} className="text-muted">
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