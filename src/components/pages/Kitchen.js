import '../../styles/Kitchen.css';
import API from '../../utils/API'
import React,{useState,useEffect} from 'react'

function Kitchen(props) {
    const [userId, setUserId] = useState([

    ])
    useEffect(()=>{
        API.getUser(props.userId).then(data=>{
            console.log(data)
            setKitchen(data.Kitchen)
        })
    },[props.userId])
    return (
        <div>
            <h1 className="bg-purple-400">Welcome to your Kitchen Placeholder</h1>
            setKitchen={setKitchen}
        </div>
    )
}

export default Kitchen;