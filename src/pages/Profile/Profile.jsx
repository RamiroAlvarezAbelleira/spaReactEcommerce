import { Col, Row, Table } from "react-bootstrap"
import { useSelector } from "react-redux"

import './Profile.css'


const Profile = () => {

    const user = useSelector(state => state.user)
    
  return ( user &&
    <div>
        <Row className="profile-banner">
            <h1 className="text-dark">Hello {user.firstName}!</h1>
        </Row>
        <Row className="profile-details">
            <Row>
                <Col xl={2}>
                    <img className="profile-image" src={`http://localhost:3000/images/users/${user.image}`} />
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
        </Row>
    </div>
  )
}
export default Profile