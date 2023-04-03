import { useRef } from "react";
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm"
import { updateUser } from "../../redux/states/user";

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
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialForm = {
        firstName: user.firstName,
        lastName: user.lastName,
        birthdate: user.birthdate,
        email: user.email,
        password: '',
        repassword: ''
    }

    const {
        firstNameError,
        lastNameError,
        emailError,
        birthdateError,
        passwordError,
        repasswordError,
        handleChange,
        handleBlurFirstName,
        handleBlurLastName,
        handleBlurEmail,
        handleBlurBirthdate,
        handleBlurPassword,
        handleBlurRepassword
    } = useForm(initialForm, validateForm)

    /* useRefs */
    let firstNameInput = useRef()
    let lastNameInput = useRef()
    let emailInput = useRef()
    let birthDateInput = useRef()
    let passwordInput = useRef()
    let repasswordInput = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedForm = {
            firstName: firstNameInput.current.value,
            lastName: lastNameInput.current.value,
            birthdate: birthDateInput.current.value,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            repassword: repasswordInput.current.value
        }

        fetch(`http://localhost:3000/usuarios/editar/${user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedForm) })
           .then(res => res.json())
           .then(info => {
                if (info.meta.status === 200) {
                    setTimeout(() => {
                        dispatch(updateUser({...info.data}))
                        navigate("/perfil")
                    }, 2000);
                } else {
                    console.log(info)
                }
            });
    }

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
                    onBlur={handleBlurFirstName} 
                    onChange={handleChange}>
                </Form.Control>
                { firstNameError && <Form.Text className='registerError'>{firstNameError}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Apellido</Form.Label>
                <Form.Control 
                    defaultValue={user.lastName}
                    ref={lastNameInput} 
                    name='lastName' 
                    type='text' 
                    placeholder='Perez' 
                    onBlur={handleBlurLastName} 
                    onChange={handleChange}>
                </Form.Control>
                { lastNameError && <Form.Text className='registerError'>{lastNameError}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    defaultValue={user.email}
                    ref={emailInput} 
                    name='email' 
                    type='email' 
                    placeholder='Ejemplo@mail.com' 
                    onBlur={handleBlurEmail} 
                    onChange={handleChange}>
                </Form.Control>
                { emailError && <Form.Text className='registerError'>{emailError}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control 
                    defaultValue={user.birthdate}
                    ref={birthDateInput} 
                    name='birthdate' 
                    type='date' 
                    onBlur={handleBlurBirthdate} 
                    onChange={handleChange}>
                </Form.Control>
                { birthdateError && <Form.Text className='registerError'>{birthdateError}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    ref={passwordInput} 
                    name='password' 
                    type='password' 
                    placeholder='Contraseña' 
                    onBlur={handleBlurPassword} 
                    onChange={handleChange}>
                </Form.Control>
                { passwordError && <Form.Text className='registerError'>{passwordError}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control 
                    ref={repasswordInput} 
                    name='repassword' 
                    type='password' 
                    placeholder='Confirmar Contraseña' 
                    onBlur={handleBlurRepassword} 
                    onChange={handleChange}>
                </Form.Control>
                { repasswordError && <Form.Text className='registerError'>{repasswordError}</Form.Text> }
            </Form.Group>
            <Form.Group className='w-100 mt-5 d-flex justify-content-center'>
                <Button onClick={handleSubmit} className='w-25' variant="secondary">Confirmar</Button>
            </Form.Group>
        </Form>
  )
}
export default ProfileEdit