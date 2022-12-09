// import '../styles/Storage.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'

function Storage(props) {
    const [storage, setStorage] = useState([])
    useEffect(()=> {
        console.log(props)
        // API.getStorage(props.kitchenId).then(data => {
        //     const userStorages = data.filter((s) => {
        //         if (s.KitchenId === props.kitchenId) {
        //             return s;
        //         } else {  
        //         return null;
        //         }
        //     }) 

        //     // console.log(data)
        //     setStorage(userStorages)
        //     console.log(userStorages)
        // })
    })

  return (
    <>
      <h1>Cant wait to see our storage data!</h1>


      {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="/img/card-top.jpg"
          alt="Sunset in the mountains"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            winter
          </span>
        </div>
      </div> */}
    </>
  );
}

export default Storage;
