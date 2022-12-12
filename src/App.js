
import { useEffect, useInsertionEffect, useState } from "react";
import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import API from "./utils/API";
// import PageContainer from './components/PageContainer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import ShoppingList from './components/pages/ShoppingList';
import DonationList from './components/pages/DonationList';
import Calendar from './components/pages/Calendar';
import Kitchen from './components/pages/Kitchen';
import Recipe from './components/pages/Recipe';
import Storage from './components/pages/Storage';

import KitchenById from './components/pages/KitchenById';

function App() {
  const [userId, setUserId] = useState(0);
  // const [kitchenId, setKitchenId] = useState(0)
  const [userObj, setUserObj] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // console.log(storedToken);
      API.getUserFromToken(storedToken).then((data) => {
        if (data.user) {
          // console.log(data)
          setToken(storedToken);
          setIsLoggedIn(true);
          setUserId(data.user.id);
          setUserId(data.user);
        }
      });
    } else {
      console.log("no stored token");
    }
  }, []);

  const handleLoginSubmit = (userObj) => {
  
    API.login({
      email: userObj.email,
      password: userObj.password,
    }).then((data) => {
      console.log(data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserId(0);
    setToken("");
  };

  const handleSignupSubmit = (userObj) => {
    API.signup({
      name: userObj.name,
      email: userObj.email,
      password: userObj.password,
    }).then((data) => {
      console.log(data);
      if (data.token) {
        setUserId(data.user.id);
        setToken(data.token);
        setIsLoggedIn(true);
        localStorage.setItem("token", data.token);
      }
    });
  };

  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                isLoggedIn={isLoggedIn}
                handleLoginSubmit={handleLoginSubmit}
                handleSignupSubmit={handleSignupSubmit}
              />
            }
          />
          {/* Might want to come back and re route the psuedo routes to be more in line with the actual routes */}
          <Route path="/shoppinglist" element={<ShoppingList userId={userId} token={token}/>}/>
          <Route path="/donationlist" element={<DonationList userId={userId} token={token}/>}/>
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/kitchen" element={<Kitchen userId={userId} token={token}/>} />
          {/* <Route path="/recipe" element={<Recipe/>}/> */}
          <Route path="/storage" element={<Storage userId={userId} token={token}/>}/>
          <Route path="/kitchen/:id" component= {<KitchenById/>}/>
        </Routes>
      </Router>

      <Footer />
        
    </div>
  );
}

export default App;
