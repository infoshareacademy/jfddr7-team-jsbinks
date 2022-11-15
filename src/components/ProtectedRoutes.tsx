import { Navigate, Outlet } from "react-router-dom";
import {useContext} from 'react';
import { StoreContext } from "../StoreProvider";


const useAuth = () => {
    const {username} = useContext(StoreContext);
    const user = {userin: username};
    return user && user.userin;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoutes;