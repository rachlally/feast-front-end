// import '../styles/Storage.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react';

function Storage(props) {
    // console.log(props)
    const [storage, setStorage] = useState([])
    const [newStorageType, setNewStorageType]=useState("refrigerator")

    useEffect(() => {
        API.getStorages(props.token, props.userId.id).then(data => {
            console.log(data)
            setStorage(data)
        })
    }, [
        props.userId
    ])

    const storages = storage.map((s,i) => {
        // Maps over the 'products' of 's' (storages)
        const products = s.Products.map((p,i) => {
            // console.log(p)

            // Returns items from the nested map, to be injected into the main return statement
            return (
                <div key={i}>
                    <p key={p.id}>{p.name}</p>
                </div>
                )
            }
        )

        // Main return statement
        return (
            <ul key={i}>
                <li>This is a: {s.storageType}. This is storage #{s.id}. It has: {products}</li>
            </ul>
        )
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(storage)
        console.log(props)
        const newStorage = {
            storageType: newStorageType,
            KitchenId: storage[0].KitchenId
        };
        setNewStorageType('')
        console.log(newStorage)

        API.addToStorage(newStorage, props.token)
        .then((data)=>{
            API.getUser(props.userId.id).then(data=>{
                console.log(data);
                // setStorage(data.Kitchens)
            })
        })
        // .then((newStorageData) => {
            // console.log(props)
        //     API.getStorages(props.userId.id).then(data => {
        //         console.log(data)
                // setStorage(data.zipCode)
            // })
        // })
    }

    return (
        <>
            <h1>Welcome to your storages</h1>
            <div>
                {storages}
                {storages.products}
                <form onSubmit={handleFormSubmit}>

                    {/* <input name="storageType" placeholder="Storage Type?" value={newStorageType}
                        onChange={(e) => setNewStorageType(e.target.value)}/> */}

<select className="form-field" value={newStorageType} onChange={e=>setNewStorageType(e.target.value)}>
          {/* refers to reasonForMessage */}
          <option value="refrigerator">Refrigerator</option>
          <option value="freezer">Freezer</option>
          <option value="pantry">Pantry</option>
          <option value="outDoorFridge">Outdoor Fridge</option>

          <option value="walkInFreezer">Walk In Freezer</option>
          {/* <option value="other"><input>Other</input></option> */}
        </select>

                    <br/>
                    <button
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                        Create Storage
                    </button>
                </form>
            </div>
        </>
    )
}













export default Storage;