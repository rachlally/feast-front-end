import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import Products from "../pages/Products";
import API from "../../utils/API";
// import DateChange from './DatePurchased';
// import Datepicker from 'react-tailwindcss-datepicker';
// import { isTemplateElement } from "@babel/types";
// import ExpirationDate from "./ExpirationDate";
import '../../styles/ShoppingList.css';

// New
function ShoppingList(props) {
  const location = useLocation();
  const [newProductName, setNewProductName] = useState("");
  // const [datePurchased, setDatePurchased] = useState("")
  // const [expirationDate, setExpirationDate] = useState("")
  const [shopping, setShopping] = useState([]);

  const kitchenId = location.state.kitchenId;
  const kitchenName = location.state.kitchenName;
  const shoppingId = location.state.shoppingId;

  // console.log("EXIT EXIT NOW!!");
  useEffect(() => {
    API.getShopping(props.token, kitchenId).then((data) => {
        // console.log(data);
        setShopping(data);
      });
    }, [kitchenId, props.token]);


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
        ShoppingListId: shoppingId
      };
      setNewProductName("")
      // setDatePurchased("")
      // setExpirationDate("")
      console.log(newListItem)
      
      API.addToShopping(newListItem, props.token).then((newShoppingData) => {
          API.getShopping(props.token, kitchenId).then(data => {
              console.log(data)
              setShopping(data)
          })
      });
    };

    const deleteShoppingItem = (id)=> {
      API.deleteShopping(id, props.token).then ((data)=> {
        API.getShopping(props.token, kitchenId).then(data => {
          setShopping(data)
        })
      })
    }


  return (
    <div className="h-screen bg-sky-300 font-mono flex flex-col flex-wrap content-center">
     
      <div>
      <p className="text-m text-bold flex justify-center text-white font-helvetica font-bold pb-4">
        Shopping List for kitchen: {kitchenName}
      </p>

      <form
        onSubmit={handleFormSubmit}
      className="flex flex-col"
      >
        <input
          name="newProductName"
          placeholder="Enter product name"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          // className='pl-3'
        />
        {/* <br /> */}
        <button
          className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add to Shopping List
        </button>
      </form>
      </div>
      <ul className="overflow-auto shopping-list">
        <li className="m-4 p-4 font-bold">{shopping.map((s, i) => {
        const products = s.Products.map((p, i) => {
            //   console.log(p);
            
            // Returning product names
            return ( 
            <div key={i} className="flex justify-between items-center p-2 m-2 border-2 ">
              {p.name}
              <button 
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => deleteShoppingItem(p.id)}>
                  Purchased
              </button>
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
