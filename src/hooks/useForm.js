import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { createUser, updateUser } from "../redux/states/user"
import axios from "../api/axios"

export const useForm = (initialForm, validateForm) => {
    const user = useSelector(state => state.user);

    const [form, setForm] = useState(initialForm)
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)

    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setForm({
                ...form,
                [name]: files[0]
            })
        } else {
            setForm({
                ...form,
                [name]: value
            })
        }
        
    };

    const handleBlur = (e) => {
        handleChange(e);
        const { name } = e.target;
        let errors = validateForm(form);
        if (errors[name]) {
            e.target.style.borderColor= "#e74c3c";
        } else {
            e.target.style.borderColor= "#2ecc71";
        }
        setFormErrors({
            ...formErrors,
            [name]: errors[name]
        })
    }

    //  ---------- Register Handler ----------

    const handleRegister = (e) => {
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
        
        // We verificate if there aren't errors to send the new products, if there are errors we prevent the submition. 
        let errors = validateForm(form)

        if (!Object.keys(errors).length > 0) {
            setLoading(true)
            const axiosRegister = async () => {
                let response = await axios.post('/usuarios/crear', newUser)
                if(response.status === 201) {
                    setResponse(true)
                    setForm(initialForm)
                    setFormErrors({})
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/")
                    }, 2000);
                    
                } else {
                    let errors = response.data.data
                    setFormErrors({
                        firstName: errors?.firstName?.msg || null,
                        lastName: errors?.lastName?.msg || null,
                        email: errors?.email?.msg || null,
                        birthdate: errors?.birthdate?.msg || null,
                        password: errors?.paswword?.msg || null,
                        repassword: errors?.repassword?.msg || null
                    })
                }
            }
            axiosRegister();
        }
        
    };

    // -------- Login Handler -------------

    const handleLogin = (e) => {
        e.preventDefault()

        let errors = validateForm(form);

        if (!Object.keys(errors).length > 0) {
            let credentials = {
                email: form.email, 
                password: form.password
            };
            const axiosLogin = async () => {
                let response = await axios.post('/usuarios/ingresar', credentials)
                if(response.status === 200) {
                    setResponse(true)
                    setForm(initialForm)
                    setFormErrors({})
                    dispatch(createUser({...response.data.data}))
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/")
                    }, 2000);
                    
                } else {
                    setFormErrors({
                        invalid: 'Credenciales invalidas'
                    })
                }
            }
            axiosLogin();
        }
      }

    //   ---------- Profile edition handler ---------

      const handleProfileEdit = (e) => {
        e.preventDefault()

        const updatedForm = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            birthdate: form.birthdate,
            password: form.password,
            repassword: form.repassword
        }

        let errors = validateForm(form);

        if (!Object.keys(errors).length > 0) {
            const axiosProfileEdition = async () => {
                let response = await axios.post('/usuarios/crear', updatedForm)
                if(response.status === 200) {
                    setResponse(true)
                    setForm(initialForm)
                    setFormErrors({})
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/perfil")
                    }, 2000);
                    
                } else {
                    let errors = response.data.data
                    setFormErrors({
                        firstName: errors?.firstName?.msg || null,
                        lastName: errors?.lastName?.msg || null,
                        email: errors?.email?.msg || null,
                        birthdate: errors?.birthdate?.msg || null,
                        password: errors?.paswword?.msg || null,
                        repassword: errors?.repassword?.msg || null
                    })
                }
            }
            axiosProfileEdition();
        }
    }

    // -------- Product Creation Handler ----------

      const handleProductCreate = (e) => {
        e.preventDefault()
        let newProduct = new FormData();
        newProduct.append("categoryId", form.categoryId)
        newProduct.append("typeId", form.typeId)
        newProduct.append("description", form.description)
        newProduct.append("price", form.price)
        newProduct.append("discount", form.discount)
        newProduct.append("brandId", form.brandId)
        newProduct.append("model", form.model)
        newProduct.append("sizeId", form.sizeId)
        newProduct.append("brakeId", form.brakeId)
        newProduct.append("colorId", form.colorId)
        newProduct.append("wheelSizeId", form.wheelSizeId)
        newProduct.append("frameId", form.frameId)
        newProduct.append("shiftId", form.shiftId)
        newProduct.append("suspensionId", form.suspensionId)
        newProduct.append("info", form.info)
        newProduct.append("image", form.image)

        let errors = validateForm(form)


        if (!Object.keys(errors).length > 0) {
            setLoading(true)
            const axiosPost = async () => {
                let response = await axios.post('/productos/crear', newProduct)
                if (response.status === 201) {
                    setResponse(true)
                    setForm(initialForm)
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/")
                    }, 2000);
                } else {
                    let errors = response.data.data
                    setFormErrors({
                        categoryId: errors?.categoryId?.msg,
                        typeId: errors?.typeId?.msg,
                        description: errors?.description?.msg,
                        price: errors?.price?.msg,
                        discount: errors?.discount?.msg,
                        brandId: errors?.brandId?.msg,
                        model: errors?.model?.msg
                    })
                }
            }

            axiosPost();
        }
      }

      const handleProductEdit = (e, id) => {
        e.preventDefault()
        let newProduct = new FormData();
        newProduct.append("categoryId", form.categoryId)
        newProduct.append("typeId", form.typeId)
        newProduct.append("description", form.description)
        newProduct.append("price", form.price)
        newProduct.append("discount", form.discount)
        newProduct.append("brandId", form.brandId)
        newProduct.append("model", form.model)
        newProduct.append("sizeId", form.sizeId)
        newProduct.append("brakeId", form.brakeId)
        newProduct.append("colorId", form.colorId)
        newProduct.append("wheelSizeId", form.wheelSizeId)
        newProduct.append("frameId", form.frameId)
        newProduct.append("shiftId", form.shiftId)
        newProduct.append("suspensionId", form.suspensionId)
        newProduct.append("info", form.info)
        newProduct.append("image", form.image)

        let errors = validateForm(form)

        if (!Object.keys(errors).length > 0) {
            setLoading(true)
            const axiosPost = async () => {
                let response = await axios.put(`/productos/editar/${id}`, newProduct)
                if (response.status === 200) {
                    setResponse(true)
                    setForm(initialForm)
                    setTimeout(() => {
                        setResponse(false)
                        navigate("/")
                    }, 2000);
                } else {
                    let errors = response.data.data
                    setFormErrors({
                        categoryId: errors?.categoryId?.msg,
                        typeId: errors?.typeId?.msg,
                        description: errors?.description?.msg,
                        price: errors?.price?.msg,
                        discount: errors?.discount?.msg,
                        brandId: errors?.brandId?.msg,
                        model: errors?.model?.msg
                    })
                }
            }

            axiosPost();
        }
      }

    return {
        form,
        formErrors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleRegister,
        handleLogin,
        handleProfileEdit,
        handleProductCreate,
        handleProductEdit,
        setLoading,
        setResponse,
        setForm
    }
}