import Map from './Map';
import API from '../../utils/API';
import React, { useState, useEffect } from 'react';

function DonationList(props) {
    const [donation, setDonation] = useState([])

    useEffect(() => {
        API.getDonations(props.token, props.userId.id).then(data => {
            console.log(data)
            setDonation(data)
        })
    }, [
        props.userId
    ])

    const donations = donation.map((d,i) => {
        //Maps over products of donation list
        const products = d.Products.map((p,i) => {
            console.log(p)
            return (
                <ul key={i}>
                    <li>{p.name}</li>
                </ul>
            )
        })
        return (
            <ul key={i}>
                <li className='font-bold'>This is: {d.name}</li>
                <li> {products}</li>
            </ul>
        )
    })

    return (
        <>
            <h1>Here is your Donation list:</h1>
            <div>
                {donations}
            </div>
        </>
    )
}

export default DonationList;