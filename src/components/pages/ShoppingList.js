import React, { useEffect, useState } from "react";
import Products from "../pages/Products";
import API from "../../utils/API";
// import '../styles/ShoppingList.css';

// New
function ShoppingList(props) {
  const [newProductName, setNewProductName] = useState("");
  const [shopping, setShopping] = useState([]);

  useEffect(() => {
    API.getShopping(props.token, props.userId.id).then((data) => {
        // console.log(data);
        setShopping(data);
    });
}, [props.userId]);


  // WIP add new product to a user shopping list
  
  // Shopping list owner
  const shoppingListOwner = shopping.map((s, i) => {
      return <div key={i}>{s.name}</div>;
    });
    
    const shoppings = shopping.map((s, i) => {
        const products = s.Products.map((p, i) => {
            //   console.log(p);
            
            // Returning product names
            return <div key={i}>{p.name}</div>;
        });
        
        // console.log(s);
        return <div key={i}>{products}</div>;
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // console.log(newProductName)
        console.log(shopping[0])
      const newListItem = {
        name: newProductName,
        isPerishable: true,
        datePurchased: "2022-12-05",
        expirationDate: "2023-09-05",
        ShoppingListId: shopping[0].id
      };
      setNewProductName("")
      console.log(newListItem)
      
      API.addToShopping(newListItem, props.token).then((newShoppingData) => {
          API.getShopping(props.userId.id).then(data => {
              console.log(data)
              setShopping(data[0].Products)
            //   setNewProductName(shopping);
            //   console.log(newProductName)
          })
      });
    };

  // Other
  // const purchasedItem = idx=>{
  //     const arrCopy = [...products];
  //     arrCopy[idx].isPurchased = !arr[idx].isPurchased
  //     setProducts(arrCopy)
  // }

  return (
    <div className="bg-sky-300 font-mono flex flex-wrap justify-center">
      <h1 className="text-purple-800 font-mono font-bold underline">
        {shoppingListOwner}
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
        />
        <br />
        <button
          className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add to Shopping List
        </button>
      </form>

      <ul>
        <li className="m-4 p-4 font-bold">{shoppings}</li>
        <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
          Purchased
        </button>
      </ul>
    </div>
  );
}

export default ShoppingList;
