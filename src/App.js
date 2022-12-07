import {useEffect,useInsertionEffect,useState} from 'react';
// import Footer from './components/Footer';
// import Header from './components/Header';
import API from './utils/API';

function App() {
  const [userId, setUserId]= useState(0);
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const [token, setToken] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword]= useState("");

useEffect(()=>{
  const storedToken = localStorage.getItem("token")
  if(storedToken){
    console.log(storedToken)
    API.getUserFromToken(storedToken).then(data=>{
      if(data.user){
        console.log(data)
        setToken(storedToken)
        setIsLoggedIn(true)
        setUserId(data.user.id)
      }
    })
  } else{
    console.log("no stored token")
  }
},[])

const handleLoginSubmit = e=>{
  e.preventDefault();
  API.login({
    email:loginEmail,
    password:loginPassword
  }).then(data=>{
    console.log(data);
    if(data.token){
      setUserId(data.user.id)
      setToken(data.token)
      setIsLoggedIn(true)
      localStorage.setItem("token", data.token)
    }
  })
}
const handleLogout = ()=>{
  localStorage.removeItem("token");
  setIsLoggedIn(false);
  setUserId(0);
  setToken("");
}

  return (
   <div className='App'>
    {isLoggedIn&&<button onClick={handleLogout}>Logout</button>}
    {isLoggedIn?(
      <div>
        {/* Put stuff here to append to page */}
        <h1>test login</h1>
      </div>
    ):(
      <>
      {/*not logged in */}
      <h1>not logged in</h1>
      <form onSubmit={handleLoginSubmit}>
        <h2>Login</h2>
        <input name="email"  value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="email"/>
          <input type="password" name="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="password"/>
          <button>Log in!</button>
      </form>
      </>
    )}
   </div>
  );
}

export default App;
