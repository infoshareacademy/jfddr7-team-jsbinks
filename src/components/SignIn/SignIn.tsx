
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom"

export const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    
    const handleSignUp = () => {
      const user = {email, password}
      signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(cred=>{
        console.log("user created", cred.user)
      })
      .catch((error) => {
        console.log(error.message);
      })
      navigate('/home')
    }
    
  return (
    <>
      <form className="ui form on">
        <div className="field">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            placeholder="Your E-mail"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>     
      </form>
      <div className="field">
        <button 
          className="ui button" 
          type="submit"
          onClick={handleSignUp}
        >
          Sign In
        </button>
        <Link to='/signup'>
          <button 
            className="ui button" 
            type="submit"
          >
            Go To Sign Up
          </button>
        </Link>
      </div>
    </>
  )
}