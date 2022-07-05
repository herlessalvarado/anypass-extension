import { useContext } from 'react'
import Context from '../state/Context'

const useState = () => {
  const context = useContext(Context)
  return { ...context }
}

export default useState
