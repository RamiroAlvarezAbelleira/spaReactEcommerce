import { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'
import axios from '../../api/axios';

const initialForm = {
    categoryId: "",
    typeId: "",
    description: "",
    price: "",
    discount: "",
    brandId: "",
    model: "",
    sizeId: "",
    brakeId: "",
    colorId: "",
    wheelSizeId: "",
    frameId: "",
    shiftId: "",
    suspensionId: "",
    info: "",
    image: ''
};

// Validaciones

const validateForm = (form) => {
    let errors = {};
    if (!form.categoryId) {
        errors.categoryId = 'Debe seleccionar una opcion'
    } else {
        delete errors.categoryId
    }


    if (!form.typeId) {
        errors.typeId = 'Debe seleccionar una opcion'
    } else {
        delete errors.typeId
    }


    if (!form.description.trim()) {
        errors.description = "El campo no puede estar vacio"
    } else if (form.description.length < 8) {
        errors.description = "La descripción debe contener 8 caracteres como mínimo";
    } else {            
        delete errors.description
    }


    if (!form.price.trim()) {
        errors.price = "El precio no puede estar vacio";
      } else if (+form.price <= 0) {
          errors.price = "El precio no puede ser menor a cero";
      } else {
          delete errors.price;
      }


      if (!form.discount.trim()) {
        errors.discount = "El descuento no puede estar vacio";
      } else if (+form.discount < 0 || +form.discount > 100) {
          errors.discount = "El descuento no puede ser menor a 0%, ni mayor a 100%";
      } else {
          delete errors.discount;
      }


      if (!form.brandId) {
        errors.brandId = 'Debe seleccionar una opcion'
    } else {
        delete errors.brandId
    }


      if (!form.model.trim()) {
        errors.model = "El campo modelo no puede estar vacio";
    } else if (form.model.length < 2) {
        errors.model = "El modelo debe contener 2 caracteres como mínimo";
    } else {            
        delete errors.model
    }


    if (!form.sizeId) {
        errors.sizeId = 'Debe seleccionar una opcion'
    } else {
        delete errors.sizeId
    }


    if (!form.colorId) {
        errors.colorId = 'Debe seleccionar una opcion'
    } else {
        delete errors.colorId
    }

    if (form.image === '') {
        errors.image = 'Debe cargar una imagen'
    } else {
        delete errors.image
    }


    return errors
}

const ProductCreate = () => {
    const [fields, setFields] = useState({})

    useEffect(() => {
        const axiosGetProductFields = async () => {
            let response = await axios.get('/productos/info-formulario');
            setFields(response.data.data)
        }

        axiosGetProductFields()
    }, [])

    const {
        formErrors,
        handleChange,
        handleBlur,
        handleProductCreate
    } = useForm(initialForm, validateForm)

    return ( fields &&
        <Form className='formMargin w-75 bg-white p-5'>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Cargar imagen</Form.Label>
                <Form.Control 
                    type="file" 
                    multiple
                    name='image'
                    onBlur={handleBlur} 
                    onChange={handleChange} />
                    { formErrors?.image && <Form.Text className='registerError'>{formErrors?.image}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Producto:</Form.Label>
                <Form.Select 
                    name='categoryId'
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione una categoria -</option>
                    {fields.categories?.map(category => {
                            return <option value={category.id} key={category.id}> {category.name} </option>
                        })}
                </Form.Select>
                { formErrors?.categoryId && <Form.Text className='registerError'>{formErrors?.categoryId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Tipo:</Form.Label>
                <Form.Select
                    name='typeId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un tipo de producto -</option>
                    {fields.types?.map(type => {
                            return <option value={type.id} key={type.id}> {type.name} </option>
                        })}
                </Form.Select>
                { formErrors?.typeId && <Form.Text className='registerError'>{formErrors?.typeId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Descripcion:</Form.Label>
                <Form.Control 
                    name='description' 
                    type='text' 
                    placeholder='Bicicleta Venzo Frida...' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                </Form.Control>
                { formErrors?.description && <Form.Text className='registerError'>{formErrors?.description}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Precio:</Form.Label>
                <Form.Control 
                    name='price' 
                    type='number' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                </Form.Control>
                { formErrors?.price && <Form.Text className='registerError'>{formErrors?.price}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Descuento:</Form.Label>
                <Form.Control 
                    name='discount' 
                    type='number' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                </Form.Control>
                { formErrors?.discount && <Form.Text className='registerError'>{formErrors?.discount}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Marca:</Form.Label>
                <Form.Select
                    name='brandId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un tipo de producto -</option>
                    {fields.brands?.map(brand => {
                            return <option value={brand.id} key={brand.id}> {brand.name} </option>
                        })}
                </Form.Select>
                { formErrors?.brandId && <Form.Text className='registerError'>{formErrors?.brandId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Modelo:</Form.Label>
                <Form.Control 
                    name='model' 
                    type='text' 
                    placeholder='Wish 290 Entry...' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                </Form.Control>
                { formErrors?.model && <Form.Text className='registerError'>{formErrors?.model}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Talle:</Form.Label>
                <Form.Select
                    name='sizeId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione el talle -</option>
                    {fields.sizes?.map(size => {
                            return <option value={size.id} key={size.id}> {size.name} </option>
                        })}
                </Form.Select>
                { formErrors?.sizeId && <Form.Text className='registerError'>{formErrors?.sizeId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Frenos:</Form.Label>
                <Form.Select
                    name='brakeId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un tipo de frenos -</option>
                    {fields.brakes?.map(brake => {
                            return <option value={brake.id} key={brake.id}> {brake.type} </option>
                        })}
                </Form.Select>
                { formErrors?.brakeId && <Form.Text className='registerError'>{formErrors?.brakeId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Color:</Form.Label>
                <Form.Select
                    name='colorId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un color -</option>
                    {fields.colors?.map(color => {
                            return <option value={color.id} key={color.id}> {color.name} </option>
                        })}
                </Form.Select>
                { formErrors?.colorId && <Form.Text className='registerError'>{formErrors?.colorId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Rodado:</Form.Label>
                <Form.Select
                    name='wheelSizeId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un rodado -</option>
                    {fields.wheelSizes?.map(wheelSize => {
                            return <option value={wheelSize.id} key={wheelSize.id}> {wheelSize.number} </option>
                        })}
                </Form.Select>
                { formErrors?.wheelSizeId && <Form.Text className='registerError'>{formErrors?.wheelSizeId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Cuadro:</Form.Label>
                <Form.Select
                    name='frameId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un tipo de cuadro -</option>
                    {fields.frames?.map(frame => {
                            return <option value={frame.id} key={frame.id}> {frame.name} </option>
                        })}
                </Form.Select>
                { formErrors?.frameId && <Form.Text className='registerError'>{formErrors?.frameId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Velocidades:</Form.Label>
                <Form.Select
                    name='shiftId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione la cantidad de velocidades -</option>
                    {fields.shifts?.map(shift => {
                            return <option value={shift.id} key={shift.id}> {shift.number} </option>
                        })}
                </Form.Select>
                { formErrors?.shiftId && <Form.Text className='registerError'>{formErrors?.shiftId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Suspencion:</Form.Label>
                <Form.Select
                    name='suspensionId' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                    <option value=''>- Seleccione un tipo de suspencion -</option>
                    {fields.suspensions?.map(suspension => {
                            return <option value={suspension.id} key={suspension.id}> {suspension.type} </option>
                        })}
                </Form.Select>
                { formErrors?.suspensionId && <Form.Text className='registerError'>{formErrors?.suspensionId}</Form.Text> }
            </Form.Group>
            <Form.Group className='registerGroup'>
                <Form.Label>Info adicional:</Form.Label>
                <Form.Control  
                    name='info' 
                    as='textarea' 
                    rows={3}
                    placeholder='Descripcion detallada (opcional)' 
                    onBlur={handleBlur} 
                    onChange={handleChange}>
                </Form.Control>
                { formErrors?.info && <Form.Text className='registerError'>{formErrors?.info}</Form.Text> }
            </Form.Group>
            <Form.Group className='w-100 mt-5 d-flex justify-content-center'>
                <Button onClick={handleProductCreate} className='w-25' variant="secondary">Crear Producto</Button>
            </Form.Group>
        </Form>
    )
}
export default ProductCreate