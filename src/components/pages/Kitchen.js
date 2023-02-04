import "../../styles/Kitchen.css";
import API from "../../utils/API";
import React, { useState, useEffect } from "react";
import KitchenById from "./KitchenById";
import { useNavigate, Navigate } from "react-router-dom";

function Kitchen(props) {
  const [kitchen, setKitchen] = useState([]);
  const [newKitchenLocation, setNewKitchenLocation] = useState("");
  const [newKitchenName, setNewKitchenName] = useState("");
  const navigate = useNavigate();
  // console.log(props)

  // Not currently being used
  // const [storages, setStorages] = useState([])

  useEffect(() => {
    // console.log(props.userId.id);
    API.getKitchens(props.token, props.userId.id).then((data) => {
      // console.log(data);
      setKitchen(data);
    });
  }, [props.userId]);

  const handleRedirectClick = (user, id) => {
    // console.log(`Go to ${user.name}'s kitchen with id ${id}`);

    //Api call to get kitchen by id
    API.getOneKitchen(props.token, id).then((data) => {
      console.log(data);
      navigate(`/kitchen/${data.id}`, {
        state: { kitchenId: id, kitchenName: data.name },
      });
    });
  };

  const handleKitchenDelete = (id) => {
    //e.preventDefault();
    console.log("test");

    //handle kitchen delete
    API.deleteKitchen(id, props.token).then((data) => {
      API.getKitchens(props.token, props.userId.id).then((data) => {
        // console.log(data);
        setKitchen(data);
      });
    });
  };

  const handleDonationClick = (id) => {
    console.log("test");

    API.getDonations(props.token, id).then((data) => {
      // console.log(data);
      navigate(`/donation/${data[0].id}`, {
        state: {
          data: data[0],
          kitchenName: data[0].Kitchen.name,
          kitchenId: data[0].KitchenId,
          donationId: data[0].id,
        },
      });
    });
  };

  const handleShoppingClick = (id) => {
    console.log("test");

    API.getShopping(props.token, id).then((data) => {
      console.log(data);
      navigate(`/shopping/${data[0].id}`, {
        state: {
          data: data[0],
          kitchenName: data[0].Kitchen.name,
          kitchenId: data[0].KitchenId,
          shoppingId: data[0].id,
        },
      });
    });
  };

  // console.log(kitchens)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(kitchen);
    const newKitchen = {
      name: newKitchenName,
      zipCode: newKitchenLocation,
      UserId: props.userId.id,
    };
    // console.log(newKitchen);
    setNewKitchenLocation("");
    setNewKitchenName("");
    // console.log(newKitchen);

    API.addToKitchen(newKitchen, props.token).then((data) => {
      API.getKitchens(props.token, props.userId.id).then((data) => {
        // console.log(data);
        setKitchen(data);
      });
    });
  };

  return (
    <div className="h-screen overflow-auto bg-sky-300">
      {/* Add a kitchen */}
      <div className="flex grid content-center bg-sky-300">
        <form className="flex m-3" onSubmit={handleFormSubmit}>
          <input
            name="name"
            className="bg-white text-black rounded-lg mb-1 mr-1 mt-0.5 leading-tight w-full h-10 appearance-none block"
            placeholder="Kitchen name"
            value={newKitchenName}
            onChange={(e) => setNewKitchenName(e.target.value)}
          />
          <input
            name="zipCode"
            className="bg-white text-black rounded-lg mr-1 mb-1 mt-0.5 leading-tight w-full h-10 appearance-none block"
            placeholder="Zipcode, please?"
            value={newKitchenLocation}
            // onChange={(e) => setNewKitchenLocation(e.target.value)}

            onChange={(e)=>{
              const {value} = e.target;
              setNewKitchenLocation(value.replace(/[^\d{5}]$/, "").substr(0, 5));
            }}
          />
          <button className="inline-block px-4 mb-1 mt-0.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
            Create Kitchen
          </button>
        </form>
      </div>
      <div className="flex flex-col text-xl text-bold justify-center text-center bg-sky-200">
        <h1>{props.userId.name}'s Kitchen(s)</h1>
        
        <div className="kitchen-card block px-6 rounded-lg w-full grid grid-cols-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {kitchen.map((k, i) => {
            //I think that this is where our storage reroute should be handled
            return (
              
                <div
                  key={"z" + k.id}
                  className="flex flex-col items-center bg-white p-3 m-3 rounded-lg shadow-xl shadow-green-200 max-w-sm"
                >
                  <div key={"a" + k.id} className="text-xl text-bold">
                    {k.name}
                  </div>
                  <br/>
                  <div key={"i" + k.id} className="mx-4">
                    <div key={"b" + k.id}>
                      This kitchen is found at zipcode: {k.zipCode}
                    </div>
                    <div key={"d" + k.id}>
                      {/* It has the following storage type: {storages} */}
                    </div>
                    {/* Container div for view/delete buttons */}
                    <div
                      key={"j" + k.id}
                      className="flex justify-between justify-around flex-wrap"
                    >
                      <button
                        key={"e" + k.id}
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => handleRedirectClick(k.User, k.id)}
                      >
                        View Kitchen
                      </button>

                      <button
                        key={"g" + k.id}
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => handleDonationClick(k.id)}
                      >
                        View Donation List
                      </button>

                      <button
                        key={"h" + k.id}
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => handleShoppingClick(k.id)}
                      >
                        View Shopping List
                      </button>

                      <button
                        key={"f" + k.id}
                        className="inline-block m-3 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={() => handleKitchenDelete(k.id)}
                      >
                        Delete Kitchen
                      </button>
                    </div>
                  </div>
                </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Kitchen;
