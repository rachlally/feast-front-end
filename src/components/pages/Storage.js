// import '../styles/Storage.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react';

function Storage(props) {
    const [storage, setStorage] = useState([])

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
            console.log(p)

            // Returns items from the nested map, to be injected into the main return statement
            return (
                <div key={i}>
                    <p>{p.name}</p>
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

    return (
        <>
            <h1>Welcome to your storages</h1>
            <div>
                {storages}
                {storages.products}
            </div>
        </>
    )
}













export default Storage;