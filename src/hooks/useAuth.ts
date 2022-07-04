import { useContext } from 'react'
import AuthContext from '../state/AuthContext'

const useAuth = () => {
  const context = useContext(AuthContext)
  return { ...context }
}

export default useAuth
