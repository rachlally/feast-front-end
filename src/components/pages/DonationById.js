import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../../utils/API";
import Map from "./Map";
import Datepicker from "react-tailwindcss-datepicker";

function DonationById(props) {
  const [donationList, setDonationList] = useState([]);
  const location = useLocation();
  const [newProductName, setNewProductName] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const [coordinates, setCoordinates] = useState({
    lat: 47.606209,
    lng: -122.332069,
  });

  const [loading, setLoading] = useState(true);
  // const donationListData = location.state.data
  const kitchenId = location.state.kitchenId;
  const kitchenName = location.state.kitchenName;
  const donationId = location.state.donationId;
  // console.log(props)

  useEffect(() => {
    API.getDonations(props.token, kitchenId).then((data) => {
      // console.log(data);
      // console.log(donationListData)
      setDonationList(data);
      // console.log(donationList);
      var zipCode = data[0].Kitchen.zipCode;
      console.log(zipCode);
      API.getCoordinatesFromZip(zipCode).then((data) => {
        console.log(data);
        setCoordinates(data);
        setLoading(false);
      });
    });
  }, [kitchenId, props.token]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(donationList);
    const newListItem = {
      name: newProductName,
      // isPerishable: true,
      datePurchased: datePurchased,
      expirationDate: expirationDate,
      DonationListId: donationId,
    };
    setNewProductName("");
    console.log(newListItem);

    API.addToDonation(newListItem, props.token).then((data) => {
      API.getDonations(props.token, kitchenId).then((data) => {
        // console.log(data);
        setDonationList(data);
      });
    });
  };

  const DatePicker = () => {
    
    const [date, setDate] = useState({
      startDate: null,
      endDate: null,
    })
    ;

    const handleDateChange = (newDate) => {
      // console.log(newDate);
      // console.log(newDate.startDate);
      // console.log(newDate.endDate);
      setDatePurchased(newDate.startDate);
      setExpirationDate(newDate.endDate);
      setDate(newDate);
      console.log(newDate);
      // setDate("")
     
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
      API.getDonations(props.token, kitchenId).then((data) => {
        console.log("item deleted");
        setDonationList(data);
      });
    });
  };

  return (
    <div className="bg-sky-300 font-helvetica justify-center pb-20 ">
      <p className="text-m text-bold flex justify-center text-white font-helvetica font-bold">
        Donation List for kitchen: {kitchenName}
      </p>

      <form
        className="flex grid grid-cols-1"
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
        <button className="lg:justify-self-center inline-block lg:w-1/6 mx-6 mt-1 px-4 py-1.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out">
          Add to Donation List
        </button>
      </form>

      <div className="flex justify-center pt-5">
        {loading ? null : <Map lat={coordinates.lat} lng={coordinates.lng} />}
      </div>

      <ul className="flex flex-col border-4 m-3 ">
        <div>
          <p className="text-m text-bold flex justify-center text-white font-helvetica font-bold">
            Your list items:
          </p>
          <div className="flex justify-around px-2 mx-2 pt-2 mt-2 ">
            <p>Name</p>
            <p>Expiration</p>
            <p>Delete</p>
          </div>
        </div>

        {/* <li className="font-semibold flex justify-center"> */}
        {donationList.map((d, i) => {
          const products = d.Products.map((p, i) => {
            return (
              <div key={i} className="flex p-2 m-2 border-2 justify-around">
                <p className="" key={"a" + p.id}>
                  {p.name}
                </p>
                <p key={"b" + p.id} className="text-red-600 ">
                  {p.expirationDate}
                </p>
                <button
                  className="float-right inline-block px-4 py-1.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-300 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => deleteItem(p.id)}
                >
                  Delete Item
                </button>
              </div>
            );
          });
          return <div key={d.id}>{products}</div>;
        })}
        {/* </li> */}
      </ul>
    </div>
  );
}

export default DonationById;
