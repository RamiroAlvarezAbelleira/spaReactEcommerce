import { Button, Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import './Profile.css'


const Profile = () => {

    const user = useSelector(state => state.user)
    
  return ( user &&
    <div>
        <Row className="profile-banner d-flex justify-content-center">
            <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Hello {user.firstName}!</h1>
        </Row>
        <Row className="profile-details">
            <Row>
                <Col xl={2}>
                    <img className="profile-image" src={`https://apiecommerce-development.up.railway.app/images/users/${user.image}`} />
                </Col>
                <Col xl={10} className="d-flex align-items-center">
                    <h3 className="m-0 text-dark">User details</h3>
                </Col>
            </Row>
            <Row className="profile-table">
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{user.firstName}</td>
                        </tr>
                        <tr>
                            <td>Lastname</td>
                            <td>{user.lastName}</td>
                        </tr>
                        <tr>
                            <td>email</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td className="last-table-row">birthdate</td>
                            <td className="last-table-row">{user.birthdate}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            <Row className="d-flex justify-content-end align-self-end">
                <Link className='w-25 align-self-end mb-5 mr-2' to={`/perfil/edit`}><Button className="w-100" variant="secondary">Editar</Button></Link>
            </Row>
            
        </Row>
    </div>
  )
}
export default Profile