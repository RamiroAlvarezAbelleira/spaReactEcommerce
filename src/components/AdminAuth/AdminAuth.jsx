import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom"

const AdminAuth = () => {
    const user = useSelector(state => state.user)
    const location = useLocation();
    
  return (
    user?.roleId === 1
        ? <Outlet />
        : <Navigate to="/" state={{ from: location}} replace />
  )
}
export default AdminAuth