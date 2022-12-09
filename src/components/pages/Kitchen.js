import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'


function Kitchen(props) {
    const [kitchen, setKitchen] = useState([])

    useEffect(() => {
        API.getKitchens(props.userId).then(data => {
            // const allKitchens = data.map((a,i)=>{
            //     return a.Storages;
            // })
            const userKitchens = data.filter((k) => {
                if (k.UserId === props.userId) {
                    return k;
                } else {  
                return null;
                }
            }) 
            // const stringKitchen = JSON.stringify(userKitchens)
            console.log(data)
            setKitchen(userKitchens)
            console.log(userKitchens)
 
        })
    }, [props.userId])

    return (
        <div>
            <h1>Welcome to your Kitchen Placeholder</h1>
            <div>
                {kitchen.map((k,i)=>
                <p key={i}> {k.zipCode}</p>)}
                {/* {kitchen}  */}
            </div>

        </div>
    )
}

export default Kitchen;