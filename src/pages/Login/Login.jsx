import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './login.css'

const Login = () => {
  return (
    <Form className='w-50 p-5 formMargin bg-white'>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Contraseña" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordarme" />
      </Form.Group>
      <Form.Group className='w-100 d-flex justify-content-center'>
      <Button className='w-25' variant="secondary" type="submit">
        Submit
      </Button>
      </Form.Group>
    </Form>
  )
}

export default Login