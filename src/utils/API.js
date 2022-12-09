// DEV SERVER
const URL_PREFIX = 'http://localhost:3001'

// LIVE SERVER
// const URL_PREFIX = 'https://wastenot.herokuapp.com'

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
    
    //Get user
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

    //Signup new user
    signup: (userObj)=>{
        return fetch(`${URL_PREFIX}/api/users`,{
            method:"POST",
            body:JSON.stringify(userObj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },

    //Get kitchens
    getKitchens: (token, userId)=>{
        return fetch(`${URL_PREFIX}/api/kitchens/user/${userId}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },

    //Get storages
    getStorages: (token, userId)=>{
        return fetch(`${URL_PREFIX}/api/storages/user/${userId}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },

    //Get Donation list
    getDonations: (token, userId)=>{
        return fetch(`${URL_PREFIX}/api/donation/user/${userId}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },
    
    //Get products
    getProducts: (token, KitchenId)=> {
        return fetch(`${URL_PREFIX}/api/products/kitchen/${KitchenId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type':'applcation/json'
            }
        }).then(res=>res.json())
    }
}

export default API;