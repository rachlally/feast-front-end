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
        <div className="flex justify-center m-4 ">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <form className="form-group mb-6" onSubmit={loginHandle}>

                <h2>Login</h2>

                <input 
                name="email" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                value={loginEmail} 
                onChange={e => setLoginEmail(e.target.value)} 
                placeholder="email" />

                <input 
                name="password" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  
                type="password" 
                value={loginPassword} 
                onChange={e => setLoginPassword(e.target.value)} 
                placeholder="password" />
                <button 
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                Log in
                </button>
            </form>

            <form onSubmit={signupHandle}>
                <h2>Create Account</h2>
                <input 
                name="userName" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                value={signupUserName} 
                onChange={e => setSignupUserName(e.target.value)} 
                placeholder="Username" />
                <input 
                name="email" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  
                value={signupEmail} 
                onChange={e => setSignupEmail(e.target.value)} 
                placeholder="email" />
                <input 
                name="password" 
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  
                type="password" 
                value={signupPassword} 
                onChange={e => setSignupPassword(e.target.value)} 
                placeholder="password" />
                <button 
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                Sign up!
                </button>
            </form>
        </div>
        </div>
    )
}

