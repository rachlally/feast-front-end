// Navbar accordian with 
    //Shopping list
    // Donation list
    // Kitchen list
    // Calendar

// Recipe suggestions

// Logout

// Tenatively Meal planner

import '../styles/Navbar.css';

function Navbar({ currentPage, handlePageChange }) {
    return (
    <nav className='flex items-center justify-between flex-wrap bg-purple-500'>
        <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <h1 className='font-semibold text-xl tracking-tight'>WasteNot (Subject to change)</h1>
        </div>

        <div className='block lg:hidden'>
            <button className='flex items-center px-3 py-2 border rounded text-purple-200 border-purple-400 hover:text-white hover:border-white'>
                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>

        <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
            <div className='text-sm lg:flex-grow'>
                <a className={currentPage === 'ShoppingList' ? 'nav-link active' : 'nav-link block mt-4 lg:inline-block      lg:mt-0 text-purple-200 hover:text-white mr-4'}
                href='#ShoppingList'
                onClick={() => handlePageChange('ShoppingList')}>
                Shopping List
                </a>

                <a className={currentPage === 'DonationList' ? 'nav-link active' : 'nav-link  block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white mr-4'}
                href='#DonationList'
                onClick={() => handlePageChange('DonationList')}>
                Donation List
                </a>

                <a className={currentPage === 'Calendar' ? 'nav-link active' : 'nav-link  block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white'}
                href='#Calendar'
                onClick={() => handlePageChange('Calendar')}>
                Calendar
                </a>

                {/* <a className={currentPage === 'MealPLanner block mt-4 lg:inline-block lg:mt-0 text-purple-200 hover:text-white' ? 'nav-link active' : 'nav-link'}
                href='#MealPlanner'
                onClick={() => handlePageChange('Resume')}>
                Meal Planner
                </a> */}
            </div>
            <a href='#RecipeSuggestions'></a>
        </div>
    </nav>
    );
}

export default Navbar;