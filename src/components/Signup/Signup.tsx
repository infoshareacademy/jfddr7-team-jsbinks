import "./Signup.module.css"
import {firebaseAuth} from "../../index"
import {useState} from "react"
import { createUserWithEmailAndPassword } from 'firebase/auth'



export const SignUp = () => {
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const handleSignUp = () => {
  const user = {email, password}
  createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then(cred=>{
    console.log("user created", cred.user)
  })
}

    return (
        <form className="ui form on">
  <div className="field">
    <label>First Name</label>
    <input type="text" name="first-name" placeholder="First Name"/>
  </div>
  <div className="field">
    <label>Last Name</label>
    <input type="text" name="last-name" placeholder="Last Name"/>
  </div>
  <div className="field">
    <div className="ui checkbox">
      <input type="checkbox" tabIndex={0} className="hidden"/>
      <label>I agree to the Terms and Conditions</label>
    </div>
  </div>
  <button className="ui button" type="submit">Submit</button>
</form>
    )
}