import { useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'
import './register.css'

const initialForm = {
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: '',
    repassword: ''
}

// Validaciones

const validateForm = (form) => {
    let errors = {};

    if (!form.firstName.trim()) {
        errors.firstName = "El campo no puede estar vacio"
    } else if (form.firstName.length < 2) {
        errors.firstName = "El nombre debe contener 2 caracteres como mínimo";
    } else {            
        delete errors.firstName
    }


    if (!form.lastName.trim()) {
        errors.lastName = "El campo no puede estar vacio";
      } else if (form.lastName.length < 2) {
          errors.lastName = "El apellido debe contener 2 caracteres como mínimo";
      } else {
          delete errors.lastName;
      }


      if (!form.email.trim()) {
        errors.email = "El campo no puede estar vacio";
      } else if ('validar formato') {
          errors.email = "Ingrese un formato valido";
      } else {
          delete errors.email;
      }


      if (!form.birthdate) {
        errors.birthdate = 'El campo no puede estar vacio'
    } else {
        delete errors.birthdate
    }


      if (!form.password.trim()) {
        errors.password = "El campo no puede estar vacio";
    } else if (form.password.length < 8) {
        errors.password = "La contraseña debe contener 8 caracteres como mínimo";
    } else {            
        delete errors.password
    }

    if (!form.repassword.trim()) {
        errors.repassword = "El campo no puede estar vacio";
    } else if (form.repassword !== form.password) {
        errors.repassword = "Las contraseñas no coinciden";
    } else {            
        delete errors.repassword
    }


    return errors
}

const Register = () => {

    const {
        form,
        firstNameError,
        lastNameError,
        emailError,
        birthdateError,
        passwordError,
        repasswordError,
        loading,
        response,
        handleChange,
        handleBlurFirstName,
        handleBlurLastName,
        handleBlurEmail,
        handleBlurBirthdate,
        handleBlurPassword,
        handleBlurRepassword,
        handleSubmit
    } = useForm(initialForm, validateForm)

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