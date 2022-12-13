import React, { useState, useEffect } from "react";
import API from "../../utils/API";



// console.log(window.location.href)




function KitchenById(props) {
  const [storages, setStorages] = useState([]);

const currentURL = window.location.href;
const kitchenId = currentURL.substring(currentURL.lastIndexOf('/')+1)
console.log(kitchenId)

useEffect(()=>{
  API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
    console.log(data);
    setStorages(data)
   
  });
},[kitchenId])



  // console.log(storage)
  return (
    <>
    
    <h1>PLEASE WORK</h1>

    {/* {storages.map((kitchens, i)=>{
      return(
        <>
       
        </>
      )
    })} */}
    {storages.map((kitchens, i)=>{
       const kitchenProducts = kitchens.Products.map((products,i)=>{
        console.log(products.name)
        
        return(
          <div key={i}>
            <h2>{products.name} expires on: {products.expirationDate}</h2>
          </div>
        )
      })
      return(
        <>
        <h1>{kitchens.storageType}</h1>
        <h2>{kitchenProducts}</h2>
        </>
      )
    })}
    </>
  )
}

export default KitchenById