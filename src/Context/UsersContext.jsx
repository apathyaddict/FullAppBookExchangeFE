import React, {createContext, useReducer, useEffect} from 'react'

export const UsersContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return {user :null }
         default: 
         return state       
    }
}

export const UsersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  //check if user is already logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
      dispatch( {type: 'LOGIN', payload: user})
    }
  }, [])

  console.log('AuthContext state: ', state)

    
  return (
    <UsersContext.Provider value = {{...state, dispatch}}>
        { children }
    </UsersContext.Provider>
  )
}

