import {useEffect,useInsertionEffect,useState} from 'react';
import Footer from './components/Footer';
// import Header from './components/Header';
import API from './utils/API';
import PageContainer from './components/PageContainer';

function App() {
  const [userId, setUserId]= useState(0);
  const [isLoggedIn, setIsLoggedIn]= useState(false);
  const [token, setToken] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword]= useState("");
  const [signupUserName, setSignupUserName]=useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword]= useState("");


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

const handleSignupSubmit = e =>{
  e.preventDefault();
  API.signup({
    name: signupUserName,
    email:signupEmail,
    password:signupPassword
  }).then(data=>{
    console.log(data);
    if(data.token){
      
      setUserId(data.user.id)
      setToken(data.token)
      setSignupEmail(data.user.email)
      setIsLoggedIn(true)
      localStorage.setItem("token", data.token)
    }
  })
}

  return (
   <div className='App'>
    {isLoggedIn&&<button onClick={handleLogout}>Logout</button>}
    {isLoggedIn?(
      <div>
        {/* Put stuff here to append to page */}
        <PageContainer 
          isLoggedIn={isLoggedIn} 
          userId={userId} 
          token={token} 
          loginEmail={loginEmail}
          setIsLoggedIn={setIsLoggedIn}
          setToken={setToken}
          setUserId={setUserId}
          setLoginEmail={setLoginEmail}
        />
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

      <form onSubmit = {handleSignupSubmit}>
        <h2>Create Account</h2>
        <input name="userName"  value={signupUserName} onChange={e=>setSignupUserName(e.target.value)} placeholder="Username"/>
        <input name="email"  value={signupEmail} onChange={e=>setSignupEmail(e.target.value)} placeholder="email"/>
        <input type="password" name="password" value={signupPassword} onChange={e=>setSignupPassword(e.target.value)} placeholder="password"/>
          <button>Sign up!</button>
      </form>
      <Footer />
      </>
    )}
   </div>
  );
}

export default App;
