import { useRef } from 'react'
import { Form, Button, Row, Col, Badge } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'
import { MoonLoader } from 'react-spinners'
import './register.css'
import image from '../../assets/images/logo-BM.png'

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
      } else if (false) {
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
        formErrors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleRegister
    } = useForm(initialForm, validateForm)

    /* useRefs */
    let firstNameInput = useRef()
    let lastNameInput = useRef()
    let emailInput = useRef()
    let birthDateInput = useRef()
    let passwordInput = useRef()
    let repasswordInput = useRef()

    return (
        <Row className='w-100 m-0 p-0'>
            <Col xl={8} lg={6} className='d-flex flex-column mt-5 pt-5 px-0 align-items-center'>

                <img src={image} className='w-25' alt='logo bicimundo' />
                <h1>Bienvenido a Bicimundo</h1>
                <h4>Cree su cuenta gratuita ahora!</h4>
            </Col>
            <Col xl={4} lg={6} className='p-0'>
                <Form className='register-form bg-white p-5'>
                    <h2>Registro</h2>
                    {loading ?
                        <div className='register-spinner'>
                            <MoonLoader color={'#b9b9b9'} loading={true} size={40} margin={10}/>
                        </div>
                        :
                        <></>
                    }
                    {response ?
                        <div className='register-spinner'>
                            <Badge className='fs-5 p-2' pill bg="success">Registro exitoso!</Badge>
                        </div>
                        :
                        <></>
                    }
                    <Form.Group className='registerGroup'>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control 
                            ref={firstNameInput} 
                            name='firstName' 
                            type='text' 
                            placeholder='Juan' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.firstName && <Form.Text className='registerError'>{formErrors?.firstName}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='registerGroup'>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control 
                            ref={lastNameInput} 
                            name='lastName' 
                            type='text' 
                            placeholder='Perez' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.lastName && <Form.Text className='registerError'>{formErrors?.lastName}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='registerGroup'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            ref={emailInput} 
                            name='email' 
                            type='email' 
                            placeholder='Ejemplo@mail.com' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.email && <Form.Text className='registerError'>{formErrors?.email}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='registerGroup'>
                        <Form.Label>Fecha de nacimiento</Form.Label>
                        <Form.Control 
                            ref={birthDateInput} 
                            name='birthdate' 
                            type='date' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.birthdate && <Form.Text className='registerError'>{formErrors?.birthdate}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='registerGroup'>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control 
                            ref={passwordInput} 
                            name='password' 
                            type='password' 
                            placeholder='Contraseña' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.password && <Form.Text className='registerError'>{formErrors?.password}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='registerGroup'>
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control 
                            ref={repasswordInput} 
                            name='repassword' 
                            type='password' 
                            placeholder='Confirmar Contraseña' 
                            onBlur={handleBlur} 
                            onChange={handleChange}>
                        </Form.Control>
                        { formErrors?.repassword && <Form.Text className='registerError'>{formErrors?.repassword}</Form.Text> }
                    </Form.Group>
                    <Form.Group className='w-100 mt-5 d-flex justify-content-center'>
                        <Button onClick={handleRegister} className='w-25' variant="secondary">Crear Cuenta</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    )
}

export default Register