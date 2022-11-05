import { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import './register.css'

const initialForm = {
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    repassword: ''
}

const Register = () => {
    /* useRefs */
    let firstNameInput = useRef()
    let lastNameInput = useRef()
    let emailInput = useRef()
    let birthDateInput = useRef()
    let passwordInput = useRef()
    let repasswordInput = useRef()

    const handleRegister = (e) => {
        e.preventDefault()
        let newUser = {
            firstName: firstNameInput.current.value,
            lastName: lastNameInput.current.value,
            birthdate: birthDateInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            repassword: repasswordInput.current.value
        }
        console.log(newUser)
    }

    return (
        <Form className='formMargin w-75 bg-white p-5'>
            <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control ref={firstNameInput} type='text' placeholder='Juan'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Apellido</Form.Label>
                <Form.Control ref={lastNameInput} type='text' placeholder='Perez'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control ref={emailInput} type='email' placeholder='Ejemplo@mail.com'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control ref={birthDateInput} type='date'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control ref={passwordInput} type='password' placeholder='Contraseña'></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control ref={repasswordInput} type='password' placeholder='Confirmar Contraseña'></Form.Control>
            </Form.Group>
            <Form.Group className='w-100 mt-5 d-flex justify-content-center'>
                <Button onClick={handleRegister} className='w-25' variant="secondary">Crear Cuenta</Button>
            </Form.Group>
        </Form>
    )
}

export default Register