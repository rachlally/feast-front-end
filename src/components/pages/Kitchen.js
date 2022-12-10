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

    const kitchenOwner = kitchen.map((k,i) => {
        return (
            <div key={i}>{k.User.name}'s Kitchen</div>
        )
    })

    const kitchens = kitchen.map((k,i) => {
            return (
                <div key={i}>#{k.id} found at zipcode {k.zipCode}</div>
            )
        })
        console.log(kitchens)

    return (
        <div>
            <h1>{kitchenOwner}</h1>
        </div>
    )
}

export default Kitchen;