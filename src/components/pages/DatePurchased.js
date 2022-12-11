import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const DatePurchased = () => {
    const [date, setDate] = useState({
        startDate: null,
        endDate: null
    });

    const handleDateChange = (newDate) => {
        console.log('newDate:', newDate);
        setDate(newDate);
        console.log(date)
    }

    return (
        <Datepicker
            primaryColor={"green"}
            placeholder={'Date purchased'}
            asSingle={true}
            value={date}
            onChange={handleDateChange}
            showShortcuts={true}
        />
    )
}

export default DatePurchased;
