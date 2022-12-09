import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../styles/Login.css';

export default function Login(props) {
    const navigate = useNavigate()
    useEffect(() => {
        if (props.isLoggedIn) {
            navigate("/kitchen")
        }
    }, [props.isLoggedIn])
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [signupUserName, setSignupUserName] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");

    const loginHandle = e => {
        e.preventDefault();
        props.handleLoginSubmit({
            email: loginEmail,
            password: loginPassword
        })
    }
    const signupHandle = e => {
        e.preventDefault();
        props.handleSignupSubmit({
            name: signupUserName,
            email: signupEmail,
            password: signupPassword
        })
    }
    return (
        <div>
            <form onSubmit={loginHandle}>
                <h2>Login</h2>
                <input name="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="email" />
                <input type="password" name="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="password" />
                <button>Log in!</button>
            </form>

            <form onSubmit={signupHandle}>
                <h2>Create Account</h2>
                <input name="userName" value={signupUserName} onChange={e => setSignupUserName(e.target.value)} placeholder="Username" />
                <input name="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="email" />
                <input type="password" name="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} placeholder="password" />
                <button>Sign up!</button>
            </form>
        </div>
    )
}