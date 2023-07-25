import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    
    const isRoleAllowed = allowedRoles?.includes(auth?.roles);
    return (
        isRoleAllowed
            ? <Navigate to="/patientdash" state={{ from: location }} replace />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;