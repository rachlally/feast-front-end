import React from "react";
const recipeAPI = {
  recipes: (ingredientInput) =>{
    //split so that spaces are replaces wit %20
    //split on spac
    //
    // ingredientInput.split(" ").join("%20")

    fetch(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientInput}&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

    // function Recipe(ingredientInput) {

    //     //split so that spaces are replaces wit %20
    //         //split on spac
    //         //
    // // ingredientInput.split(" ").join("%20")

    // fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredientInput}&app_id=f8d2a9ae&app_key=4d3ee4a8bbd450583932d553443686b8`)
    // 	.then(response => response.json())
    // 	.then(response => console.log(response))
    // 	.catch(err => console.error(err));

    // return (
    //     <div>
    //         <h1>Cooking Inspiration</h1>
    //         <input

    //             className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    //             // value={}
    //             // onChange={e => (e.target.value)}
    //             placeholder="Ingredient" />
    //     </div>
    // )
  },
};

// Recipe("Nathan Alexander")
export default recipeAPI;
