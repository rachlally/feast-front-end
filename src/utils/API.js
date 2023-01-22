// DEV SERVER
// const URL_PREFIX = 'http://localhost:3001'
import Geocode from "react-geocode";

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

// LIVE SERVER
const URL_PREFIX = "https://wastenot.herokuapp.com";

const API = {
  //login user
  login: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Get user
  getUser: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/${userId}`).then((res) => res.json());
  },

  //get user from localstorage
  getUserFromToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/getuserfromtoken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Signup new user
  signup: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //get storage by kitchenId
  getStoragesByKitchenId: (token, kitchenId) => {
    return fetch(`${URL_PREFIX}/api/storages/kitchens/${kitchenId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Get kitchens
  getKitchens: (token, userId) => {
    return fetch(`${URL_PREFIX}/api/kitchens/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Add a kitchen
  addToKitchen: (kitchenObj, token) => {
    return fetch(`${URL_PREFIX}/api/kitchens/`, {
      method: "POST",
      body: JSON.stringify(kitchenObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Delete a kitchen
  deleteKitchen: (id, token) => {
    return fetch(`${URL_PREFIX}/api/kitchens/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Get storages
  getStorages: (token, userId) => {
    return fetch(`${URL_PREFIX}/api/storages/user/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Edit Storages
  editStorage: (storageObj, id, token) => {
    return fetch(`${URL_PREFIX}/api/storages/${id}`, {
      method: "PUT",
      body: JSON.stringify(storageObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Delete Storages
  deleteStorage: (id, token) => {
    return fetch(`${URL_PREFIX}/api/storages/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Get Donation list
  getDonations: (token, kitchenId) => {
    return fetch(`${URL_PREFIX}/api/donation/kitchen/${kitchenId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  //Add product to donationList
  addToDonation: (donationObj, token) => {
    return fetch(`${URL_PREFIX}/api/products/`, {
      method: "POST",
      body: JSON.stringify(donationObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Delete a product from donationList
  deleteDonation: (id, token) => {
    return fetch(`${URL_PREFIX}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Get Shopping list
  getShopping: (token, kitchenId) => {
    return fetch(`${URL_PREFIX}/api/shopping/kitchen/${kitchenId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  // Add product to shoppingList
  addToShopping: (shoppingObj, token) => {
    return fetch(`${URL_PREFIX}/api/products/`, {
      method: "POST",
      body: JSON.stringify(shoppingObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Delete a product from shoppingList
  deleteShopping: (id, token) => {
    return fetch(`${URL_PREFIX}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  // Add a product
  addProduct: (productObj, token) => {
    return fetch(`${URL_PREFIX}/api/products/`, {
      method: "POST",
      body: JSON.stringify(productObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  // Delete a product from storage
  deleteStorageProduct: (id, token) => {
    return fetch(`${URL_PREFIX}/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //Get products
  getProducts: (token, KitchenId) => {
    return fetch(`${URL_PREFIX}/api/products/kitchen/${KitchenId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  },

  // Get products by storage id
  getProductsByStorageId: (token, StorageId) => {
    return fetch(`${URL_PREFIX}/api/products/storage/${StorageId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
  },

  // add to storages
  addToStorage: (storageObj, token) => {
    return fetch(`${URL_PREFIX}/api/storages/`, {
      method: "POST",
      body: JSON.stringify(storageObj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
  },

  //get one kitchen by id
  getOneKitchen: (token, kitchenId) => {
    return fetch(`${URL_PREFIX}/api/kitchens/${kitchenId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  getCoordinatesFromZip: (zipCode) => {
    return Geocode.fromAddress(zipCode).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        return { lat, lng };
      },
      (error) => {
        console.error(error);
      }
    );
  },
};

export default API;
