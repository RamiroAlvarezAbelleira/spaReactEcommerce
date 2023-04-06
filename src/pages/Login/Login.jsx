import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm';
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
  let emailInput = useRef()
  let passwordInput = useRef()

  const {
    formErrors,
    handleChange,
    handleBlur,
    handleLogin
  } = useForm(initialForm, validateForm)



  return (
    <Form className='w-50 p-5 formMargin bg-white'>
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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordarme" />
        {formErrors?.invalid && <Form.Text className="text-danger">{formErrors?.invalid}</Form.Text>}
      </Form.Group>
      <Form.Group className='w-100 d-flex justify-content-center'>
        <Button onClick={handleLogin} className='w-25' variant="secondary">
          Submit
        </Button>
      </Form.Group>
    </Form>
  )
}

export default Login