import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

const DateChange = () => {
    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date().setMonth(11)
    });

    const handleDateChange = (newDate) => {
        console.log('newDate:', newDate);
        setDate(newDate);
    }

    return (
        <Datepicker
            primaryColor={"green"}
            value={date}
            onChange={handleDateChange}
        />
    )
}

export default DateChange;
