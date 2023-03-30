import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const useForm = (initialForm, validateForm) => {
    const [form, setForm] = useState(initialForm)
    const [firstNameError, setFirstNameError] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [birthdateError, setBirthdateError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [repasswordError, setRepasswordError] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleBlurFirstName = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.firstName) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setFirstNameError(errors.firstName)
    };

    const handleBlurLastName = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.lastName) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setLastNameError(errors.lastName)
    };

    const handleBlurEmail = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.email) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setEmailError(errors.email)
    };

    const handleBlurBirthdate = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.birthdate) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setBirthdateError(errors.birthdate)
    };

    const handleBlurPassword = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.password) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setPasswordError(errors.password)
    };

    const handleBlurRepassword = (e) => {
        handleChange(e);
        let errors = validateForm(form)
        if(errors.repassword) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setRepasswordError(errors.repassword)
    };

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        // Sequelize doesn't support empty string so we replace them with "null"
        e.preventDefault();
        let newUser = {
            firstName: form.firstName || null,
            lastName: form.lastName || null,
            email: form.email || null,
            birthdate: form.birthdate || null,
            password: form.password || null,
            repassword: form.repassword || null
        }
        console.log(newUser)
        
        // We verificate if there aren't errors to send the new products, if there are errors we prevent the submition. 
        let errors = validateForm(form)
        console.log(errors)

        if (!Object.keys(errors).length > 0) {
            console.log('entre')
            setLoading(true)
            fetch("http://localhost:3000/usuarios/crear", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) })
           .then(res => res.json())
           .then(info => {
                setLoading(false)
                console.log(info)
                if (info.meta.status === 201) {
                    
                    setResponse(true)
                    setForm(initialForm)
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/dashboard")
                    }, 2000);
                    
                } else {
                    let errors = info.data
                    setFirstNameError(errors?.firstName?.msg || null)
                    setLastNameError(errors?.lastName?.msg || null)
                    setEmailError(errors?.email?.msg || null)
                    setBirthdateError(errors?.birthdate?.msg || null)
                    setPasswordError(errors?.paswword?.msg || null)
                    setRepasswordError(errors?.repassword?.msg || null)
                }
           })
        }
        
    };

    return {
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
        handleSubmit,
        setLoading,
        setResponse,
        setForm,
        setFirstNameError,
        setLastNameError,
        setEmailError,
        setBirthdateError,
        setPasswordError,
        setRepasswordError,
    }
}