import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'


function Kitchen(props) {
    const [kitchen, setKitchen] = useState([])
    // Not currently being used
    // const [storages, setStorages] = useState([])

    useEffect(() => {
        API.getKitchens(props.token, props.userId.id).then(data => {
            console.log(data)
            setKitchen(data)
        })
    }, [props.userId])

    const kitchens = kitchen.map((k,i) => {
            return (
                <ul key={i}>
                    <li>{k.User.name}'s Kitchen #{k.id} found at zipcode {k.zipCode}</li>
                </ul>
            )
        })

    return (
        <div>
            <h1>Welcome to your Kitchen Placeholder</h1>
            <div>
                {kitchens}
            </div>
        </div>
    )
}

export default Kitchen;