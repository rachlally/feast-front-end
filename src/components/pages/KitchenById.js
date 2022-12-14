import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Datepicker from "react-tailwindcss-datepicker";
import { useLocation } from "react-router-dom";
import "../../styles/KitchenById.css";

// console.log(window.location.href)

function KitchenById(props) {
  const [storages, setStorages] = useState([]);
  const [newStorageType, setNewStorageType] = useState("refrigerator");
  const [newRecipeSearch, setnewRecipeSearch] = useState("");
  const [recipeResults, setRecipeResults] = useState([]);
  const [newStorageEdit, setNewStorageEdit] = useState("");
  const [newProductName, setNewProductName] = useState("");
  const [product, setProduct] = useState([]);
  const [datePurchased, setDatePurchased] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  // const currentURL = window.location.href;
  // const kitchenId = currentURL.substring(currentURL.lastIndexOf("/") + 1);
  const location = useLocation();
  const kitchenId = location.state.kitchenId;
  const kitchenName = location.state.kitchenName;
  const APIKey = process.env.EDAMAME_API_KEY;
  // console.log(kitchenId)

  useEffect(() => {
    API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
      // console.log(data);
      setStorages(data);
    });
  }, [kitchenId]);

  const handleAddStorageForm = (e) => {
    e.preventDefault();
    console.log(props);
    const newStorage = {
      storageType: newStorageType,
      KitchenId: kitchenId,
    };
    setNewStorageType("");
    console.log(newStorage);
    API.addToStorage(newStorage, props.token).then((data) => {
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        // console.log(data);
        setStorages(data);
      });
    });
  };

  const recipeFormSubmit = (e) => {
    e.preventDefault();
    let edamameURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${newRecipeSearch}&app_id=20dc2327&app_key=9db171bf015112ec263145950b7c52cb`;
    // console.log("edamameURL", edamameURL);
    fetch(edamameURL)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setRecipeResults(response.hits);
      });
  };


  const handleAddProduct = (id) => {
    console.log(props);
    const newProduct = {
      name: newProductName,
      datePurchased: datePurchased,
      expirationDate: expirationDate,
      StorageId: id,
    };
    setNewProductName("");
    console.log(newProduct);
    API.addProduct(newProduct, props.token).then((data) => {
      console.log(data);
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        console.log(data);
        setStorages(data);
      });
    });
  };

  const handleStorageDelete = (id) => {
    console.log("test");

    API.deleteStorage(id, props.token).then((data) => {
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        setStorages(data);
      });
    });
  };

  const handleStorageProductDelete = (id) => {
    API.deleteStorageProduct(id, props.token).then((data) => {
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        console.log(data);
        setStorages(data);
      });
    });
  };

  const handleStorageEdit = (id) => {
    const newStorage = {
      storageType: newStorageEdit,
      KitchenId: kitchenId,
    };
    setNewStorageEdit("");

    API.editStorage(newStorage, id, props.token).then((data) => {
      API.getStoragesByKitchenId(props.token, kitchenId).then((data) => {
        setStorages(data);
      });
    });

    // .then((data) =>{API.getUser(props.userId.id).then((data))

    // })
  };

  const DatePicker = () => {
    const [date, setDate] = useState({
      startDate: null,
      endDate: null,
    });

    const handleDateChange = (newDate) => {
      console.log(newDate);
      console.log(newDate.startDate);
      console.log(newDate.endDate);
      setDatePurchased(newDate.startDate);
      setExpirationDate(newDate.endDate);
    };

    return (
      <Datepicker
        placeholder={"Date"}
        useRange={false}
        value={date}
        onChange={handleDateChange}
      />
    );
  };

  // recipeFormSubmit(newRecipeSearch);

  // recipeAPI.recipes(newRecipeSearch).then((data)=>{
  //     console.log(data)
  // })

  // fetch(
  //   `https://api.edamam.com/api/recipes/v2?type=public&q=${newRecipeSearch}&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`
  // )
  //   .then((data) => data.json())
  //   .then((data) => console.log(data))
  //   // .catch((err) => console.error(err))
  //   .then((data) => {
  //     // console.log(data.count)
  //     console.log(data.count);
  //     setRecipeResults(data.hits);
  //   });

  return (
    <>
      <h1 className="flex text-xl font-semibold justify-center m-1">
        Welcome to your {kitchenName} kitchen!
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-3">
        <div className="border border-sky-300 overflow-auto">
          <div className="flex justify-between mx-6 border border-green-500">
            <div>
              <form className="flex" onSubmit={handleAddStorageForm}>
                {/* Container for select storage and dropdown */}
                <div>
                  <p>Set storage type:</p>
                  <select
                    className="form-field block pl-3 pr-12 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={newStorageType}
                    onChange={(e) => setNewStorageType(e.target.value)}
                  >
                    {/* refers to reasonForMessage */}
                    <option value="">Select Storage type</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Outdoor Fridge">Outdoor Fridge</option>

                    <option value="Walk In Freezer">Walk In Freezer</option>
                    {/* <option value="other"><input>Other</input></option> */}
                  </select>
                </div>
                <button className="inline-block mt-6 ml-1 px-4 py-1.5 bg-green-500 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                  Create Storage
                </button>
              </form>
            </div>
          </div>
          {storages.map((s, i) => {
            const products = s.Products.map((p, i) => {
              // console.log(p);

              return (
                <div key={p.id}>
                  <h2 key={"a" + p.id} className="text-green-500">
                    {p.name}
                  </h2>
                  <p key={"a" + p.id} className="text-blue-500">
                    Purchased on: {p.datePurchased}
                  </p>
                  <p key={"a" + p.id} className="text-red-500">
                    Expires on: {p.expirationDate}
                  </p>
                  <button
                    key={"a" + p.id}
                    className="inline-block m-2 px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={() => handleStorageProductDelete(p.id)}
                  >
                    Delete Product
                  </button>
                </div>
              );
            });
            return (
              <div className='border border-red-500'>
                <div className="mr-2" key={s.id}>
                  <h1 className="mx-6 flex justify-center text-lg font-semibold">
                    {s.storageType}
                  </h1>
                  {/* Add a product form */}
                  <form className="flex grid mb-1" key={"a" + s.id}>
                    {/* Container for input forms */}
                    <div className="flex justify-between mb-1">
                      <input
                        key={"b" + s.id}
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        className="ml-6 form-control border pl-3 pb-1.5 pt-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Add an item to your storage"
                      />
                      <div className="mx-6">
                        <DatePicker />
                      </div>
                    </div>
                    <button
                      className="mr-6 ml-6 py-1.5 bg-green-500 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                      key={"c" + s.id}
                      type="button"
                      onClick={() => handleAddProduct(s.id)}
                    >
                      Add a product
                    </button>
                  </form>
                  <h2 key={"d" + s.id}>{products}</h2>
                </div>
                <div key={"e" + s.id} className="flex mx-6 justify-center">
                  <form key={"f" + s.id} className="flex">
                    <button
                      key={"g" + s.id}
                      className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                      type="button"
                      onClick={() => handleStorageEdit(s.id)}
                    >
                      Edit
                    </button>
                    <select
                      key={"h" + s.id}
                      className="ml-1 form-field block pl-3 pr-12 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      value={newStorageEdit}
                      onChange={(e) => setNewStorageEdit(e.target.value)}
                    >
                      {/* refers to reasonForMessage */}
                      <option key={"i" + s.id} value="">
                        Select Storage
                      </option>
                      <option value="Refrigerator">Refrigerator</option>
                      <option key={"j" + s.id} value="Freezer">
                        Freezer
                      </option>
                      <option key={"k" + s.id} value="Pantry">
                        Pantry
                      </option>
                      <option key={"l" + s.id} value="Outdoor Fridge">
                        Outdoor Fridge
                      </option>

                      <option key={"m" + s.id} value="Walk-In Freezer">
                        Walk In Freezer
                      </option>
                      {/* <option value="other"><input>Other</input></option> */}
                    </select>
                    <button
                      key={"n" + s.id}
                      className="ml-1 inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                      type="button"
                      onClick={() => handleStorageDelete(s.id)}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border border-purple-500 overflow-auto h-screen">
        <div>
            <form
              className="flex justify-between mx-6 border border-red-500"
              onSubmit={recipeFormSubmit}
            >
              <div>
                <p>Cooking Inspiration:</p>
                <input
                  className="form-control border pl-3 pb-1.5 pt-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={newRecipeSearch}
                  onChange={(e) => setnewRecipeSearch(e.target.value)}
                  placeholder="Ingredient"
                />
              </div>
              <button className="inline-block px-4 mt-6 ml-1 py-1.5 bg-green-500 text-white rounded">
                Search recipes!
              </button>
            </form>
        </div>
          {recipeResults.map((r, i) => {
            return (
              <div className="mb-1 grid grid-cols-1 lg:grid-cols-2 border border-green-500">
                <img
                  className="rounded"
                  src={r.recipe.images.SMALL.url}
                  alt="Recipe"
                />

                <div>
                  <p className="recipe-title">{r.recipe.label}:</p>

                  <p className="w-1/2 md:w-3/4">
                    {r.recipe.ingredientLines.map((ing, i) => {
                      return <p>{ing}</p>;
                    })}
                  </p>
                </div>

                <a
                  className="mt-1 w-1/2 lg:w-1/3 ml-1 px-4 py-1.5 bg-green-500 text-white font-medium text-s leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                  href={r.recipe.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Go to recipe!
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default KitchenById;
