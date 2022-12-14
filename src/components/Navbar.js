// Navbar accordian with
//Shopping list
// Donation list
// Kitchen list
// Calendar

// Recipe suggestions

// Logout

// Tenatively Meal planner
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
        <ul className="bg-slate-800 p-8 display flex row flex-wrap justify-around text-purple-200 font-mono font-bold">
        {props.isLoggedIn ? 
        <>
         {/* <img
          className="w-96"
          src="../../../assets/burger.png"
          alt="Burger"
        /> */}
            <a className='hover:text-yellow-400  hover:tracking-wide' href="/logout " onClick = {logoutFunc}>Logout</a> 
            <a className='hover:text-yellow-400  hover:tracking-wide' href="/kitchen">Kitchen(s)</a>
            <a className='hover:text-yellow-400  hover:tracking-wide' href="/shoppinglist">Shopping List</a>
            <a className='hover:text-yellow-400  hover:tracking-wide' href="/donationlist">Donation List</a>
            </>
            : 
            <>
            <a className='hover:text-yellow-400  hover:tracking-wide' href="/"><div className="flex flex-col items-center"><p>Welcome to WasteNot, where you can manage all your kitchens to reduce food waste!</p> <p>Create an account or login to manage your kitchens!</p></div></a>
            </>
            }
            
        </ul>
    );
}

export default Navbar;
