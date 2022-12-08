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
        navigate("/login")
    }
  return (
    <ul className="flex justify-around flex-wrap">
      {props.isLoggedIn ? <a href="/logout" onClick = {logoutFunc}>Logout</a> : <a href="/login">Login/Signup</a>}
      <a href="/shoppinglist">Shopping List</a>
      <a href="/donationlist">Donation List</a>
      <a href="/calendar">Calendar</a>
      <a href="/kitchen">Kitchen</a>
      <a href="/recipe">Filter recipes by ingredients</a>
      <a href="/storage">Storage</a>
    </ul>
  );
}

export default Navbar;
