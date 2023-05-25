import { useUsersContext } from "./useUsersContext";

export const useLogout = () => {
    const { dispatch } = useUsersContext()


    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
    }

    return {logout}
}