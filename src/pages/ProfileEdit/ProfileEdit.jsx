import { useRef } from "react";
import { Button, Form } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm"

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

      if (form.password.trim() && form.password.length < 8) {
        errors.password = "La contraseña debe contener 8 caracteres como mínimo";
    } else {            
        delete errors.password
    }

    if (form.repassword !== form.password) {
        errors.repassword = "Las contraseñas no coinciden";
    } else {            
        delete errors.repassword
    }


    return errors
}

const ProfileEdit = () => {

    const user = useSelector(state => state.user);

    const initialForm = {
        firstName: user.firstName,
        lastName: user.lastName,
        birthdate: user.birthdate,
        email: user.email,
        password: '',
        repassword: ''
    }

    const {
        formErrors,
        handleChange,
        handleBlur,
        handleProfileEdit
    } = useForm(initialForm, validateForm)

    /* useRefs */
    let firstNameInput = useRef()
    let lastNameInput = useRef()
    let emailInput = useRef()
    let birthDateInput = useRef()
    let passwordInput = useRef()
    let repasswordInput = useRef()

    

  return ( user &&
    <Form className='formMargin w-75 bg-white p-5'>
            <Form.Group className='registerGroup'>
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                    defaultValue={user.firstName}
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
                    defaultValue={user.lastName}
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
                    defaultValue={user.email}
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
                    defaultValue={user.birthdate}
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
                <Button onClick={handleProfileEdit} className='w-25' variant="secondary">Confirmar</Button>
            </Form.Group>
        </Form>
  )
}
export default ProfileEdit