// import Map from './Map';
import API from '../../utils/API';
import React, { useState, useEffect } from 'react';

function DonationList(props) {
    const [newProductName, setNewProductName] = useState("");
    const [donation, setDonation] = useState([])

    useEffect(() => {
        API.getDonations(props.token, props.userId.id).then((data) => {
            console.log(data)
            setDonation(data)
        })
    }, [props.userId])

    const donationListOwner = donation.map((d,i) => {
        return <div key={"a"+ d.id}>{d.name}</div>
    })

    const donations = donation.map((d,i) => {
        //Maps over products of donation list
        const products = d.Products.map((p,i) => {
            // console.log(p)
            return (
                <div key={p.id}>
                    {p.name}
                </div>
            )
        })
        return <div key={d.id}>{products}</div>;
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(donation[0])
        const newListItem = {
            name: newProductName,
            isPerishable: true,
            datePurchased: "2022-12-05",
            expirationDate: "2023-09-05",
            DonationListId: donation[0].id
        };
        setNewProductName('')
        console.log(newListItem)

        API.addToDonation(newListItem, props.token)
        .then((data)=>{
            API.getUser(props.userId.id).then(data=>{
                console.log(data);
                setDonation(data.DonationList)
            })
        })
        // .then((newDonationData) => {
        //     API.getDonations(props.userId.id).then(data => {
        //         console.log(data)
        //         setDonation(data[0].Products)
        //     })
        // })
    }

    return (
        <div className="bg-sky-300 font-mono flex flex-wrap justify-center">
            <h1 className="text-purple-800 font-mono font-bold underline">
                {donationListOwner}
            </h1>
    
            <form
                onSubmit={handleFormSubmit}
            // className=""
            >
                <input
                name="newProductName"
                placeholder="product"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                />
                <br />
                <button
                    className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                >
                Add to Donation List
                </button>
            </form>
        
            <ul>
                <li className="m-4 p-4 font-bold">{donations}</li>
                <button className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
                Purchased
                </button>
            </ul>
            </div>
        );
}

export default DonationList;