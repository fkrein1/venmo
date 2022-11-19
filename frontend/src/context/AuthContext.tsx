import { createContext, ReactNode, useEffect, useState } from 'react'
import { getAuthToken } from '../helpers/authToken'

interface AuthContextProviderProps {
  children: ReactNode
}

interface AuthContextType {
  loggedIn: boolean
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthoContext = createContext({} as AuthContextType)

export function AuthContextProvider ({ children }: AuthContextProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = getAuthToken()
    if (token) setLoggedIn(true)
  }, [])

  return (
    <AuthoContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthoContext.Provider>
  )
}
