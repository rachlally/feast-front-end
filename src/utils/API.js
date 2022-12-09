// DEV SERVER
// const URL_PREFIX = 'http://localhost:3001'

// LIVE SERVER
const URL_PREFIX = 'https://wastenot.herokuapp.com'

const API = {
    //login user
    login:(userObj)=>{
        return fetch(`${URL_PREFIX}/api/users/login`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    getUser:(userId)=>{
        return fetch(`${URL_PREFIX}/api/users/${userId}`).then(res=>res.json())
    },
    //get user from localstorage
    getUserFromToken:(token)=>{
        return fetch(`${URL_PREFIX}/api/users/getuserfromtoken`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    signup: (userObj)=>{
        return fetch(`${URL_PREFIX}/api/users`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    getKitchens: (token, userId, storageId)=>{
        return fetch(`${URL_PREFIX}/api/kitchens/`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    }
}

export default API