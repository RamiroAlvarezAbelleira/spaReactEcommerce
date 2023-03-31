import { Table } from "react-bootstrap"
import { useSelector } from "react-redux"


const Profile = () => {

    const user = useSelector(state => state.user)
    
  return ( user &&
    <div>
        <h1>Hello {user.firstName}!</h1>
        <img src={`http://localhost:3000/images/users/${user.image}`} />
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
                    <td>birthdate</td>
                    <td>{user.birthdate}</td>
                </tr>
            </tbody>
        </Table>
    </div>
  )
}
export default Profile