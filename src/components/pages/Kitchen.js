import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'
// import {Link, useNavigate} from 'react-router-dom'


function Kitchen(props) {
    const [kitchen, setKitchen] = useState([]);
    const [newKitchenLocation, setNewKitchenLocation] = useState('');
    // Not currently being used
    // const [storages, setStorages] = useState([])

    useEffect(() => {
        API.getKitchens(props.token, props.userId.id).then(data => {
            // console.log(data)
            setKitchen(data)
        })
    }, [props.userId])

    const kitchens = kitchen.map((k,i) => {
        const storages = k.Storages.map((s,i) => {
            return (
                <div key={i}>{s.storageType}</div>
            )
        })
            return (
                <>
                {/* kitchen lists */}
                    <div className='border' key={i}>
                        <div className='text-xl text-bold'>{k.User.name}'s Kitchen #{i+1}</div>
                        <div key={'c'}>This kitchen is found at zipcode: {k.zipCode}</div>
                        <div key={'a'}>It belongs to {k.User.name}</div>
                        <div key={'d'}>It has the following storage types: {storages}</div>
                        {/* <button to = '/storages' ></button> */}
                    </div>
        

                </>
            )
        })
        // console.log(kitchens)
        const handleFormSubmit = (e) => {
            e.preventDefault();
            // console.log(kitchen[0])
            const newKitchen = {
                zipCode: newKitchenLocation,
                UserId: kitchen[0].UserId
            };
            setNewKitchenLocation('')
            console.log(newKitchen)
    
            API.addToKitchen(newKitchen, props.token)
            // .then((newKitchenData) => {
            //     console.log(props)
            //     API.getKitchens(props.userId.id).then(data => {
            //         console.log(data)
                    // setKitchen(data.zipCode)
                // })
            // })
        }

    return (
        <div className=''>
            {kitchens}
            {/* Add a kitchen */}
            <form
                onSubmit={handleFormSubmit}>
                <input
                    name='zipCode'
                    placeholder='Zipcode, please?'
                    value={newKitchenLocation}
                    onChange={(e) => setNewKitchenLocation(e.target.value)}/>
                    <br/>
                    <button
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                        Create Kitchen
                    </button>
            </form>
        </div>
    )
}

export default Kitchen;