import { useContext } from 'react'
import { AuthoContext } from '../context/authContext'

export function useAuth () {
  const value = useContext(AuthoContext)

  return value
}
