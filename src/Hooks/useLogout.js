import { useUsersContext } from "./useUsersContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { dispatch } = useUsersContext()
    const navigate = useNavigate();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({type: 'LOGOUT'})

        navigate('/')
    }
    
    return {logout}
}