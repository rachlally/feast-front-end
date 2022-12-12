import "../../styles/Kitchen.css";
import API from "../../utils/API";
import React, { useState, useEffect } from "react";
import Storage from "./Storage";
import KitchenById from "./KitchenById";
import { useNavigate } from "react-router-dom";

function Kitchen(props) {
  const [kitchen, setKitchen] = useState([]);
  const [newKitchenLocation, setNewKitchenLocation] = useState("");
  const navigate = useNavigate();

  // Not currently being used
  // const [storages, setStorages] = useState([])

  useEffect(() => {
    console.log(props.userId.id);
    API.getKitchens(props.token, props.userId.id).then((data) => {
      console.log(data);
      setKitchen(data);
    });
  }, [props.userId]);

  const handleRedirectClick = (user, id) => {
    console.log(`Go to ${user.name}'s kitchen with id ${id}`);

    //Api call to get kitchen by id
    API.getOneKitchen(props.token, id).then((data) => {
      console.log(data);
      navigate(`/kitchen/${data.id}`);
    });
  };

  const handleKitchenDelete = (id) => {
    //e.preventDefault();
    console.log("test");

    //handle kitchen delete
    API.deleteKitchen(id, props.token).then((data) => {
      console.log(data);
    });
  };

  // console.log(kitchens)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(kitchen);
    const newKitchen = {
      zipCode: newKitchenLocation,
      UserId: props.userId.id,
    };
    setNewKitchenLocation("");
    console.log(newKitchen);

    API.addToKitchen(newKitchen, props.token).then((data) => {
      API.getKitchens(props.token, props.userId.id).then((data) => {
        console.log(data);
        setKitchen(data);
      });
    });
  };

  return (
    <div>
      {/* Add a kitchen */}
      <div className="flex">
        {/* <h1>{kitchen[0].zipCode}'s Kitchens</h1> */}
        <form onSubmit={handleFormSubmit}>
          <input
            name="zipCode"
            placeholder="Zipcode, please?"
            value={newKitchenLocation}
            onChange={(e) => setNewKitchenLocation(e.target.value)}
          />
          <br />
          <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
            Create Kitchen
          </button>
        </form>
      </div>
      {kitchen.map((k, i) => {
        // const storages = k.Storages.map((s, i) => {
        //   return <div key={s.id}>{s.storageType}</div>;
        // });
        //I think that this is where our storage reroute should be handled
        return (
          <>
            {/* kitchen lists */}
            <div className="border" key={k.id}>
              <div key={"a" + k.id} className="text-xl text-bold">
                {k.User.name}'s Kitchen #{i + 1}
              </div>
              <div key={"b" + k.id}>
                This kitchen is found at zipcode: {k.zipCode}
              </div>
              <div key={"c" + k.id}>It belongs to {k.User.name}</div>
              <div key={"d" + k.id}>
                {/* It has the following storage type: {storages} */}
              </div>
              <button
                key={"e" + k.id}
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                type="button"
                onClick={()=> handleRedirectClick(k.User, k.id)}
              >
                Add Storage
              </button>
              <button
                key={"f" + k.id}
                className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                type="button"
                onClick={()=>handleKitchenDelete(k.id)}
              >
                Delete Kitchen
              </button>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Kitchen;
