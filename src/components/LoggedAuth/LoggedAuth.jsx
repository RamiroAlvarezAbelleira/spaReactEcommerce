import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom"

const LoggedAuth = () => {
    const user = useSelector(state => state.user)
    const location = useLocation();
    
  return (
    user.id !== 0
        ? <Outlet />
        : <Navigate to="/" state={{ from: location}} replace />
  )
}
export default LoggedAuth