import React from 'react'
import { Form, Button } from 'react-bootstrap'
import './register.css'

const Register = () => {
    return (
        <Form className='formMargin w-75 bg-white p-5'>
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type='text' placeholder='Juan'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control type='text' placeholder='Perez'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Ejemplo@mail.com'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control type='date'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type='password' placeholder='Contraseña'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type='password' placeholder='Confirmar Contraseña'></Form.Control>
            </Form.Group>
            <Form.Group className='w-100 mt-5 d-flex justify-content-center'>
                <Button className='w-25' variant="secondary" type="submit">Crear Cuenta</Button>
            </Form.Group>
        </Form>
    )
}

export default Register