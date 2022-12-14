import Map from "./Map";
import API from "../../utils/API";
import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function DonationList(props) {
  const [newProductName, setNewProductName] = useState("");
  const [donation, setDonation] = useState([]);
  const [datePurchased, setDatePurchased] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    API.getDonations(props.token, props.userId.id).then((data) => {
      console.log(data);
      setDonation(data);
    });
  }, [props.userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(donation);
    const newListItem = {
      name: newProductName,
      // isPerishable: true,
      datePurchased: datePurchased,
      expirationDate: expirationDate,
      DonationListId: donation[0].id,
    };
    setNewProductName("");
    console.log(newListItem);

    API.addToDonation(newListItem, props.token).then((data) => {
      API.getDonations(props.token, props.userId.id).then((data) => {
        console.log(data);
        setDonation(data);
      });
    });

    // .then((newDonationData) => {
    //     API.getDonations(props.userId.id).then(data => {
    //         console.log(data)
    //         setDonation(data[0].Products)
    //     })
    // })
  };

  const DatePicker = () => {
    const [date, setDate] = useState({
      startDate: null,
      endDate: null,
    });

    const handleDateChange = (newDate) => {
      console.log(newDate);
      console.log(newDate.startDate);
      console.log(newDate.endDate);
      setDatePurchased(newDate.startDate);
      setExpirationDate(newDate.endDate);
    };

    return (
      <Datepicker
        primaryColor={"green"}
        placeholder={"Choose your dates"}
        useRange={false}
        value={date}
        onChange={handleDateChange}
      />
    );
  };

  const deleteItem = (id) => {
    API.deleteDonation(id, props.token).then((data) => {
      API.getDonations(props.token, props.userId.id).then((data) => {
        console.log("item deleted");
        setDonation(data);
      });
    });
  };

  // MOVE AN ITEM YOU ARE DONATING TO THE SHOPPING LIST
  const addToShopping = (id) => {
    API.addToShopping(id, props.token).then((data) => {
      console.log(data);
      // console.log("please work");
    });
  };

  return (
    <div className="bg-sky-300 font-helvetica justify-center">
      {/* Donation list belongs to */}
      <h1 className="text-white font-helvetica font-bold">
        {donation.map((d, i) => {
          return <div className="flex justify-center" key={"a" + d.id}>{d.name}</div>;
        })}
      </h1>

      {/* Input form to add information */}
      <form
        className='flex grid grid-cols-1'
        onSubmit={handleFormSubmit}
        // className=""
      >
        <div className="flex mx-6">
          <input
            name="newProductName"
            placeholder="Enter product name"
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            className="bg-white text-black rounded mb-1 py-1.5 mt-0.5 leading-tight w-full appearance-none block mr-1"
          />
          <DatePicker />
        </div>
        <button
          className="lg:justify-self-center inline-block lg:w-1/6 mx-6 mt-1 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
          Add to Donation List
        </button>
      </form>

      {/* Each item that is in the donation list, as well as the 'purchased' button */}
      <ul className="flex justify-center">
        <li className="m-4 p-4 font-semibold">
          {donation.map((d, i) => {
            //Maps over products of donation list
            const products = d.Products.map((p, i) => {
              return (
                <div key={i}>
                  
                  <p>{p.name}</p>
                  <p className='text-red-600'>Expires on {p.expirationDate}
                    <button
                      className="ml-6 float-right inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => deleteItem(p.id)}
                    >
                      Delete Item
                    </button>
                  </p>
                </div>
              );
            });
            return <div key={d.id}>{products}</div>;
          })}
        </li>
      </ul>
      <div className="flex justify-center pb-20 pt-5">
        <Map />
      </div>
    </div>
  );
}

export default DonationList;
