import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React, { useState, useEffect } from 'react'
import Storage from "./Storage"


function Kitchen(props) {
    const [kitchen, setKitchen] = useState([])

    useEffect(() => {
        API.getKitchens(props.userId).then(data => {

            const userKitchens = data.filter((k) => {
                if (k.UserId === props.userId) {
                    return k;
                } else {  
                return null;
                }
            }) 

            // console.log(data)
            setKitchen(userKitchens)
            console.log(userKitchens)
 
        })
    }, [props.userId])

    return (
        <div>
            <h1>Welcome to your Kitchen Placeholder</h1>
            <div>
                {kitchen.map((k,i)=>
                
                <div>
                <p key={i}>{k.Storage} </p>
                {/* <Storage/> */}
                </div>
                
                )}
                
                {/* {kitchen}  */}
            </div>

        </div>
    )
}

export default Kitchen;