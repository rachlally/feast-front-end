import React from 'react'

export default function Products(props){
    return (
        <li className="m-4 p-4 font-bold">
            {props.shoppings}
            <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">Purchased</button>
        </li>
    )
}