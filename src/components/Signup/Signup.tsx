import "./Signup.module.css"
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from "react-router-dom"



export const SignUp = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate();

const handleSignUp = () => {
  const user = {email, password}
  createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then(cred=>{
    console.log("user created", cred.user)
  })
  .catch((error) => {
    console.log(error.message);
  })
  navigate('/signin')
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
          {/* <div className="field">
            <div className="ui checkbox">
              <input type="checkbox" tabIndex={0} className="hidden"/>
              <label>I agree to the Terms and Conditions</label>
            </div>
          </div> */}
        </form>
        <div className="field">
          <button 
            className="ui button" 
            type="submit"
            onClick={handleSignUp}
          >
              Sign Up
          </button>
          <Link to='/signin'>
            <button 
              className="ui button" 
              type="submit"
            >
                Go To Sign In
            </button>
          </Link>
        </div>
      </>
    )
}