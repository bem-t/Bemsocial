import "./login.css"
import {useRef, useContext} from 'react'
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
export const Login = () => {
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext)

    const handleSubmit=(e)=>{
        e.preventDefault()
        loginCall({email: email.current.value, password: password.current.value},dispatch)
    }
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Bemsocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world aaround you on Bemsocial
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Email" type="email" ref={email} className="loginInput" required />
                    <input placeholder="Password" type="password" minLength="6" ref={password} className="loginInput" required/>
                    <button className="loginButton" type="submit">{isFetching ? "loading" : "Log In"}</button>
                    <span className="loginForgot">Forgot Password?</span>
                    <button className="loginRegisterButton">Create New Account</button>
                </form>
            </div>
        </div>
    </div>
  )
}
