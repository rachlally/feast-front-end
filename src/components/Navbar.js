// Navbar accordian with 
    //Shopping list
    // Donation list
    // Kitchen list
    // Calendar

// Recipe suggestions

// Logout

// Tenatively Meal planner
import React from 'react';
import '../styles/Navbar.css';

function Navbar({ currentPage, handlePageChange }) {
    return (
    <ul className='flex justify-around'>
        <a 
            className={currentPage === 'ShoppingList' ? 'nav-link active' : 'nav-link'}
            href='#ShoppingList'
            onClick={() => handlePageChange('ShoppingList')}>
            Shopping List
        </a>
        <a 
            className={currentPage === 'DonationList' ? 'nav-link active' : 'nav-link'}
            href='#DonationList'
            onClick={() => handlePageChange('DonationList')}>
            Donation List
        </a>
        <a 
            className={currentPage === 'Calendar' ? 'nav-link active' : 'nav-link'}
            href='#Calendar'
            onClick={() => handlePageChange('Calendar')}>
            Calendar
        </a>
        <a 
            className={currentPage === 'Kitchen' ? 'nav-link active' : 'nav-link'}
            href='#Kitchen'
            onClick={() => handlePageChange('Kitchen')}>
            Kitchen
        </a>           
        <a 
            className={currentPage === 'Recipe' ? 'nav-link active' : 'nav-link'}
            href='#Recipe'
            onClick={() => handlePageChange('Recipe')}>
            Filter recipes by ingredients
        </a>           
        <a 
            className={currentPage === 'Storage' ? 'nav-link active' : 'nav-link'}
            href='#Storage'
            onClick={() => handlePageChange('Storage')}>
            Storage
        </a>           
    </ul>
    );
}

export default Navbar;