// This needs to be renamed because it houses the navbar components and routing

import React, { useState } from "react";
import Navbar from "./Navbar";
import ShoppingList from "./pages/ShoppingList";
import DonationList from "./pages/DonationList";
import Calendar from "./pages/Calendar";
import Kitchen from "./pages/Kitchen";
import Recipe from "./pages/Recipe";
import Storage from "./pages/Storage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function PageContainer(props) {
  // const [currentPage, setCurrentPage] = useState('Home');

  // const renderPage = () => {
  //     if (currentPage === 'ShoppingList') {
  //         return <ShoppingList />;
  //     }
  //     if (currentPage === 'DonationList') {
  //         return <DonationList />;
  //     }
  //     if (currentPage === 'Calendar') {
  //         return <Calendar />;
  //     }
  //     if (currentPage === 'Recipe') {
  //         return <Recipe />;
  //     }
  //     if (currentPage === 'Storage') {
  //         return <Storage />;
  //     }
  //     return <Kitchen />;
  // };

//   const handlePageChange = (page) => setCurrentPage(page);

  return (
    <Router>
      <Routes>
        <Route path="/kitchen" element={<Kitchen />} />
      </Routes>
    </Router>
    // <>
    //         <div className='bg-purple-500'>
    //             <div className='text-2xl'>WasteNot</div>
    //             <Navbar currentPage={currentPage} handlePageChange={handlePageChange}/>
    //         </div>
    //         {renderPage()}
    // </>
  );
}

export default PageContainer;
