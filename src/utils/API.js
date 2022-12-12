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

    //Add a kitchen
    addToKitchen: (kitchenObj, token)=>{
        return fetch(`${URL_PREFIX}/api/kitchens/`,{
            method:"POST",
            body: JSON.stringify(kitchenObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res=>res.json())
    },

    deleteKitchen: (id, token) => {
        return fetch(`${URL_PREFIX}/api/kitchens/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
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

    // Add product to donationList
    addToDonation: (donationObj, token) => {
        return fetch(`${URL_PREFIX}/api/products/`,{
            method: 'POST',
            body: JSON.stringify(donationObj),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
    },

    // Delete a product from donationList
    deleteDonation: (id, token) => {
        return fetch(`${URL_PREFIX}/api/products/${id}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
    },

    //Get Shopping list
    getShopping: (token, userId)=>{
        return fetch(`${URL_PREFIX}/api/shopping/user/${userId}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },

    // Add product to shoppingList
    addToShopping: (shoppingObj, token) => {
        return fetch(`${URL_PREFIX}/api/products/`,{
            method: 'POST',
            body: JSON.stringify(shoppingObj),
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
    },

    //Get products
    getProducts: (token, KitchenId)=> {
        return fetch(`${URL_PREFIX}/api/products/kitchen/${KitchenId}`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-type':'application/json'
            }
        }).then(res=>res.json())
    },
    addToStorage: (storageObj, token)=>{
        return fetch(`${URL_PREFIX}/api/storages/`,{
            method:"POST",
            body: JSON.stringify(storageObj),
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
            }
        }).then(res=>res.json())
    },
    //get one kitchen by id
    getOneKitchen: (token, kitchenId)=>{
        return fetch(`${URL_PREFIX}/api/kitchens/${kitchenId}`,{
            method:"GET",
            headers:{
                "Authorization": `Bearer ${token}`,
                "Content-Type":"application/json"
            }
        }).then(res=>res.json())
    },

}

export default API;