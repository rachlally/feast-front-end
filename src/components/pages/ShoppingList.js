import React, { useEffect, useState } from "react";
import Products from "../pages/Products";
import API from "../../utils/API";
// import DateChange from './DatePurchased';
import Datepicker from 'react-tailwindcss-datepicker';
import { isTemplateElement } from "@babel/types";
// import ExpirationDate from "./ExpirationDate";
// import '../styles/ShoppingList.css';

// New
function ShoppingList(props) {
  const [newProductName, setNewProductName] = useState("");
  const [datePurchased, setDatePurchased] = useState("")
  const [expirationDate, setExpirationDate] = useState("")
  const [shopping, setShopping] = useState([]);

  // console.log("EXIT EXIT NOW!!");
  useEffect(() => {
    API.getShopping(props.token, props.userId.id).then((data) => {
        // console.log(data);
        setShopping(data);
      });
    }, [props.userId]);


  // WIP add new product to a user shopping list
  
  // Shopping list owner
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log(newProductName)
        console.log(shopping[0])
        const newListItem = {
        name: newProductName,
        // isPerishable: true,
        //dates are passed in as YYYY-MM-DD
        // datePurchased: datePurchased,
        // expirationDate: expirationDate,
        ShoppingListId: shopping[0].id
      };
      setNewProductName("")
      // setDatePurchased("")
      // setExpirationDate("")
      console.log(newListItem)
      
      API.addToShopping(newListItem, props.token).then((newShoppingData) => {
          API.getShopping(props.token, props.userId.id).then(data => {
              console.log(data)
              setShopping(data)
          })
      });
    };

    const deleteShoppingItem = (id)=> {
      API.deleteShopping(id, props.token).then ((data)=> {
        API.getShopping(props.token, props.userId.id).then(data => {
          setShopping(data)
        })
      })
    }


  return (
    <div className="bg-sky-300 font-mono flex flex-wrap justify-center">
      <h1 className="text-purple-800 font-mono font-bold underline">
        {shopping.map((s, i) => {
      return <div key={i}>{s.name}</div>;
    })}
      </h1>

      <form
        onSubmit={handleFormSubmit}
      // className=""
      >
        <input
          name="newProductName"
          placeholder="product"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          className='mr-2'
        />
        {/* ShoppingList should not have a calendar to add date purchased or expiration date. You haven't even bought it yet! */}
        {/* <p>Choose your date purchased and expiration date:</p>
        <DatePicker/> */}
        <br />
        <button
          className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add to Shopping List
        </button>
      </form>

      <ul>
        <li className="m-4 p-4 font-bold">{shopping.map((s, i) => {
        const products = s.Products.map((p, i) => {
            //   console.log(p);
            
            // Returning product names
            return ( 
            <div key={i}>
              <button 
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => deleteShoppingItem(p.id)}>
                  Purchased
              </button>
              {p.name}
            </div>
            )
        });
        
        // console.log(s);
        return <div key={i}>{products}</div>;
    })}</li>
      </ul>
    </div>
  );
}

export default ShoppingList;
