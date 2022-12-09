import React, { useState } from 'react'
import Products from '../pages/Products'
// import '../styles/ShoppingList.css';



function ShoppingList() {
    const [newProduct, setNewProduct] = useState('')
    const [products, setProducts] = useState([

        {
            product: "Bread",
            isPurchased:false
        },
        {
            product: "Mayonaise",
            isPurchased:false
        },
        {
            product: "Apples",
            isPurchased:false
        },
        {
            product: "Peanut Butter",
            isPurchased:false
        },
        {
            product: "Chicken Noodle Soup",
            isPurchased:false
        }
    ])

    const handleFormSubmit = e => {
        e.preventDefault();
        const newListItem = {
            product: newProduct,
            isPurchased:false
        }
        setProducts([...products, newListItem])
    }
    // const purchasedItem = idx=>{
    //     const arrCopy = [...products];
    //     arrCopy[idx].isPurchased = !arr[idx].isPurchased
    //     setProducts(arrCopy)
    // }

    return (
        <div className="bg-sky-300 font-mono flex flex-wrap justify-center">
            <h1 className="text-purple-800 font-mono font-bold underline">Name's Shopping List</h1>
            <form onSubmit={handleFormSubmit} className="">
                <input name="newProduct" placeholder='product' value={newProduct} onChange={e => setNewProduct(e.target.value)} /><br/>
                <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">Add to Shopping List</button>
            </form>
            <ul>
                {products.map((item, i) => <Products key={i} product={item.product}  />)}

            </ul>
        </div>
    )
}

export default ShoppingList;