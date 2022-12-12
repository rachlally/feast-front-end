import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'

import Storage from "./Storage";
import KitchenById from "./KitchenById";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Kitchen(props) {
  const [kitchen, setKitchen] = useState([]);
  const [newKitchenLocation, setNewKitchenLocation] = useState("");
  //   const navigate = useNavigate();

  // Not currently being used
  // const [storages, setStorages] = useState([])

  useEffect(() => {
    API.getKitchens(props.token, props.userId.id).then((data) => {
      // console.log(data)
      setKitchen(data);
    });
  }, [props.userId]);

  const kitchens = kitchen.map((k, i) => {
    const storages = k.Storages.map((s, i) => {
      return <div key={s.id}>{s.storageType}</div>;
    });
    //I think that this is where our storage reroute should be handled
    const handleRedirectClick = (e) => {
      e.preventDefault();
      console.log(`Go to ${k.User.name}'s kitchen # ${i + 1}`);

      //Api call to get kitchen by id
      API.getOneKitchen(props.token, k.id).then((data) => {
        console.log(data)
        return (
            <Router>
                <Routes>
                    <Route path="/kitchenById" component= {<KitchenById/>}/>
                </Routes>
            </Router>
        )
      });
    };
    //renders a single kitchen component

    //   navigate("/storage")

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
            It has the following storage types: {storages}
          </div>
          <button
            className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
            type="button"
            onClick={handleRedirectClick}
          >
            Add Storage
          </button>
          {/* <Link to="/storage" element={<Storage />}onClick={handleRedirectClick}>Add Storage</Link> */}
          {/* <Router>
            <Routes>
            <Route path="/storage" element={<Storage/>}/>
            </Routes>
          </Router> */}
        </div>
      </>
    );
  });
  // console.log(kitchens)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(kitchen[0])
    const newKitchen = {
      zipCode: newKitchenLocation,
      UserId: kitchen[0].UserId,
    };
    setNewKitchenLocation("");
    console.log(newKitchen);

    API.addToKitchen(newKitchen, props.token).then((data) => {
      API.getUser(props.userId.id).then((data) => {
        console.log(data);
        setKitchen(data.Kitchens);
      });
    });
    // .then((newKitchenData) => {
    //     console.log(props)
    //     API.getKitchens(props.userId.id).then(data => {
    //         console.log(data)
    // setKitchen(data.zipCode)
    // })
    // })
  };

  return (
    <div className="">
      {kitchens}
      {/* Add a kitchen */}
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
  );
}

export default Kitchen;
