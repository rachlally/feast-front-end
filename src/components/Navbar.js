import "../styles/Navbar.css";
import {useState} from "react";
import {useNavigate} from "react-router-dom"

function Navbar(props) {
    const navigate = useNavigate();
    const logoutFunc = () => {
        props.handleLogout();
        navigate("/")
    }
    return (
        <ul className="navbar bg-slate-800 p-8 display flex row flex-wrap justify-around items-center text-purple-200 ">
        {props.isLoggedIn ? 
        <>
            <h1 className="text-helvetica font-bold text-2xl">WasteNot</h1>
            <a className='font-mono font-bold hover:text-yellow-400  hover:tracking-wide' href="/kitchen">Kitchen(s)</a>
            <a className='font-mono font-bold hover:text-yellow-400  hover:tracking-wide' href="/" onClick = {logoutFunc}>Logout</a> 
            {/* <a className='font-mono font-bold hover:text-yellow-400  hover:tracking-wide' href="/shoppinglist">Shopping List</a> */}
            {/* <a className='font-mono font-bold hover:text-yellow-400  hover:tracking-wide' href="/donationlist">Donation List</a> */}
            </>
            : 
            <>
            <a className='font-mono font-bold hover:text-yellow-400  hover:tracking-wide' href="/"><div className="flex flex-col items-center"><p>Welcome to WasteNot, where you can manage all your kitchens to reduce food waste!</p> <p>Create an account or login to manage your kitchens!</p></div></a>
            </>
            }
            
        </ul>
    );
}

export default Navbar;
