import React, { useState, useEffect } from "react";
import API from "../../utils/API";

// console.log(window.location.href)




function KitchenById(props) {
const currentURL = window.location.href;
const currentKitchenId = currentURL.substring(currentURL.lastIndexOf('/')+1)
console.log(currentKitchenId)

API.getOneKitchen(props.token, currentKitchenId).then((data) => {
  console.log(data);
});


  // console.log(storage)
  return (
    <>
    
    <h1>PLEASE WORK</h1>
    </>
  )
}

export default KitchenById