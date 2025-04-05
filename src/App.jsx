import { useState } from 'react'
import SignUpForm from './Components/SignUpForm'
import Authenticate from './Components/Authenticate'
import './App.css'

export default function App() {
  const [token, setToken] = useState(null)

  return (
    <>
      <SignUpForm setToken={setToken}/>
      <Authenticate token={token} />
    </>
  );

}

