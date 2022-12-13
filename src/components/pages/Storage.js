// import '../styles/Storage.css';
import API from "../../utils/API";
import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import recipeAPI from "./Recipe";
// import Recipe from "./Recipe"

function Storage(props) {
  // console.log(props)
  const [storage, setStorage] = useState([]);
  const [datePurchased, setDatePurchased] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [newStorageType, setNewStorageType] = useState("refrigerator");
  const [newRecipeSearch, setnewRecipeSearch] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [newStorageEdit, setNewStorageEdit] = useState("");

  useEffect(() => {
    console.log(props.userId.id);
    API.getStorages(props.token, props.userId.id).then((data) => {
      // console.log(data)
      setStorage(data);
    });
  }, [props.userId]);

  const handleStorageDelete = (e) => {
    e.preventDefault();
    console.log("test");

    API.deleteStorage(storage.id, props.token);
  };

  const handleAddStorageForm = (e) => {
    e.preventDefault();
    console.log(storage);
    console.log(props);
    const newStorage = {
      storageType: newStorageType,
      KitchenId: storage.KitchenId,
    };
    setNewStorageType("");
    console.log(newStorage);

    API.addToStorage(newStorage, props.token).then((data) => {
      API.getUser(props.userId.id).then((data) => {
        console.log(data);
        // setStorage(data.Kitchens)
      });
    });
    // .then((newStorageData) => {
    // console.log(props)
    //     API.getStorages(props.userId.id).then(data => {
    //         console.log(data)
    // setStorage(data.zipCode)
    // })
    // })
  };

  const handleDateChange = (newDate) => {
    console.log(newDate);
    console.log(newDate.startDate);
    console.log(newDate.endDate);
    setDatePurchased(newDate.startDate);
    setExpirationDate(newDate.endDate);
  };

  const recipeFormSubmit = (e) => {
    e.preventDefault();
    // recipeAPI.recipes(newRecipeSearch).then((data)=>{
    //     console.log(data)
    // })

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${newRecipeSearch}&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`
    )
      .then((data) => data.json())
      .then((data) => console.log(data))
      // .catch((err) => console.error(err))
      .then((data) => {
        // console.log(data.count)
        console.log(data);
        setRecipeResults(data.hits);
      });
  };
  const handleStorageEdit = (e) => {
    e.preventDefault();
    const newStorage = {
      storageType: newStorageEdit,
      KitchenId: storage[0].KitchenId,
    };
    setNewStorageEdit("");

    API.editStorage(newStorage, storage.id, props.token);
    // .then((data) =>{API.getUser(props.userId.id).then((data))

    // })
  };

  const recipeSearchResults = recipeResults.map((r, i) => {
    return <p>{r.recipe.label}</p>;
  });

  const DatePicker = () => {
    const [date, setDate] = useState({
      startDate: null,
      endDate: null,
    });

    return (
      <Datepicker
        primaryColor={"green"}
        placeholder={"Choose your dates"}
        useRange={false}
        value={date}
        onChange={handleDateChange}
      />
    );
  };
  return (
    <>
      <h1>Welcome to your storages</h1>

      {/* These commented out sections are for user input to add a product to their SINGULAR STORAGE */}
      {/* <input
                name="newProductName"
                placeholder="product"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className='mr-2'
                />
            <DatePicker/> */}
      <div>
        {storage.map((s, i) => {
          // Maps over the 'products' of 's' (storages)
          const products = s.Products.map((p, i) => {
            // console.log(p)

            // Returns items from the nested map, to be injected into the main return statement
            return (
              <div key={i}>
                <p key={p.id}>{p.name}</p>
              </div>
            );
          });

          return (
            <div className="flex justify-between">
              <ul key={i}>
                <li className="border">
                  This is a: {s.storageType}. This is storage #{s.id}. It has:{" "}
                  {products}
                </li>
              </ul>
              <div className="flex">
                <form className="" onSubmit={handleStorageEdit}>
                  <button
                    className="inline-block m-2 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={handleStorageEdit}
                  >
                    Edit Storage
                  </button>
                  {/* <input name="storageType" placeholder="Storage Type?" value={newStorageType}
    onChange={(e) => setNewStorageType(e.target.value)}/> */}

                  <select
                    className="form-field"
                    value={newStorageEdit}
                    onChange={(e) => setNewStorageEdit(e.target.value)}
                  >
                    {/* refers to reasonForMessage */}
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Outdoor Fridge">Outdoor Fridge</option>

                    <option value="Walk-In Freezer">Walk In Freezer</option>
                    {/* <option value="other"><input>Other</input></option> */}
                  </select>
                </form>
                <button
                  className="inline-block m-2 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                  type="button"
                  onClick={handleStorageDelete}
                >
                  Delete Storage
                </button>
              </div>
            </div>
          );
        })}
        {/* {storages.products} */}
        <form onSubmit={handleAddStorageForm}>
          {/* <input name="storageType" placeholder="Storage Type?" value={newStorageType}
                        onChange={(e) => setNewStorageType(e.target.value)}/> */}

          <select
            className="form-field"
            value={newStorageType}
            onChange={(e) => setNewStorageType(e.target.value)}
          >
            {/* refers to reasonForMessage */}
            <option value="Refrigerator">Refrigerator</option>
            <option value="Freezer">Freezer</option>
            <option value="Pantry">Pantry</option>
            <option value="Outdoor Fridge">Outdoor Fridge</option>

            <option value="Walk In Freezer">Walk In Freezer</option>
            {/* <option value="other"><input>Other</input></option> */}
          </select>

          <br />
          <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
            Create Storage
          </button>
        </form>
      </div>

      <div>
        <h1>Cooking Inspiration</h1>
        <form onSubmit={recipeFormSubmit}>
          <input
            className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            value={newRecipeSearch}
            onChange={(e) => setnewRecipeSearch(e.target.value)}
            placeholder="Ingredient"
          />
          <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
            Search recipes!
          </button>
        </form>
      </div>

      {recipeSearchResults}
    </>
  );
}

export default Storage;
