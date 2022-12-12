import React, { useState, useEffect } from "react";

// console.log(window.location.href)

const currentURL = window.location.href;
const currentKitchenId = currentURL.substring(currentURL.lastIndexOf('/')+1)
console.log(currentKitchenId)


function KitchenById(props) {
  // console.log(storage)
  return (

    <>
    <h1>PLEASE WORK</h1>
    </>
  )
}

export default KitchenById