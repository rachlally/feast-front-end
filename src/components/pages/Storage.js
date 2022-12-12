// import '../styles/Storage.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

function Storage(props) {
    const [storage, setStorage] = useState([])
    const [datePurchased, setDatePurchased] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [newProductName, setNewProductName] = useState("");

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
                <li  className='border' >This is a: {s.storageType}. This is storage #{s.id}. It has: {products}</li>
            </ul>
        )
    })

    const DatePicker = () => {
        const [date, setDate] = useState({
            startDate: null,
            endDate: null
        });
    
        const handleDateChange = (newDate) => {
            console.log(newDate)
            console.log(newDate.startDate)
            console.log(newDate.endDate)
            setDatePurchased(newDate.startDate)
            setExpirationDate(newDate.endDate)
        }
    
        return (
            <Datepicker
                primaryColor={"green"}
                placeholder={'Choose your dates'}
                useRange={false}
                value={date}
                onChange={handleDateChange}
            />
        )
    }

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
                {storages}
                {storages.products}
            </div>
        </>
    )
}













export default Storage;