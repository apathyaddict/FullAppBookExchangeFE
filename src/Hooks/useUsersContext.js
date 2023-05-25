import { UsersContext } from '../Context/UsersContext'
import { useContext } from 'react'

export const useUsersContext = () => {

    const context = useContext(UsersContext)

    if (!context){
        throw Error ('usersContext must be used inside the users context provider')
    }
  return context
  
}

