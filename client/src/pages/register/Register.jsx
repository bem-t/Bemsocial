import axios from "axios";
import { useRef } from "react"
import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import "./register.css"

export const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(confirmPassword.current.value !== password.current.value){
            confirmPassword.current.setCustomValidity("Password dont match")
        }else{
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            };
            try {
                await axios.post("/auth/register", user)
                navigate("/login");
            } catch (error) {
                console.log(error)
            }
            
        }
    }

  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Bemsocial</h3>
                <span className="loginDesc">
                    Connect with friends and the world around you on Bemsocial
                </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleSubmit}>
                    <input placeholder="Username" required ref={username} className="loginInput" />
                    <input placeholder="Email" required ref={email} type="email" className="loginInput" />
                    <input placeholder="Password" required ref={password} type="password" className="loginInput" />
                    <input placeholder="Confirm Password" required ref={confirmPassword} type="password" className="loginInput" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    <Link to="/login" >
                    <button className="loginRegisterButton">Log into Account</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>
  )
}
