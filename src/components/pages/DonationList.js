import Map from './Map';
import API from '../../utils/API';
import React, { useState, useEffect } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

function DonationList(props) {
    const [newProductName, setNewProductName] = useState("");
    const [donation, setDonation] = useState([])
    const [datePurchased, setDatePurchased] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

    useEffect(() => {
        API.getDonations(props.token, props.userId.id).then((data) => {
            // console.log(data)
            setDonation(data)
        })
    }, [props.userId])

    const donationListOwner = donation.map((d,i) => {
        return <div key={"a"+ d.id}>{d.name}</div>
    })


    const donations = donation.map((d,i) => {
        //Maps over products of donation list
        const products = d.Products.map((p,i) => {
            const deleteItem = (e) => {
                e.preventDefault();
                API.deleteDonation(p.id, props.token).then((data) => {
                    console.log('item deleted')
                })

            }

            // MOVE AN ITEM YOU ARE DONATING TO THE SHOPPING LIST
            const addToShopping = (e) => {
                e.preventDefault();
                API.addToShopping(p.id, props.token).then((data) => {
                    console.log(data)
                    console.log('please work')
                })
            }

            return (
                <div key={i}>
                    <button 
                        className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={addToShopping}>
                            Add to Shopping
                    </button>
                    {p.name} | Expires on {p.expirationDate}
                    <div className='float-right'>
                    <button 
                        className="inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={deleteItem}>
                            Delete Item
                    </button>
                    </div>
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
            datePurchased: datePurchased,
            expirationDate: expirationDate,
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
        <div className="bg-sky-300 font-mono justify-center">
            {/* Donation list belongs to */}
            <h1 className="text-purple-800 font-mono font-bold underline">
                {donationListOwner}
            </h1>

            {/* Input form to add information */}
            <form
                onSubmit={handleFormSubmit}
                className='flex'
            // className=""
            >
                <input
                name="newProductName"
                placeholder="Enter your product name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                className='bg-gray-800 text-gray-700 rounded-lg mb-10 mt-0.5 leading-tight w-full appearance-none block'
                />
                <DatePicker/>
                <button
                    className="inline-block m-3 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                >
                Add to Donation List
                </button>
            </form>
        
            {/* Each item that is in the donation list, as well as the 'purchased' button */}
            <ul>
                <li className="m-4 p-4 font-bold">{donations}</li>
            </ul>
            <Map/>
            </div>
        );
}

export default DonationList;