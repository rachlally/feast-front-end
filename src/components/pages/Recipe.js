import React from 'react'
// import '../styles/Recipe.css';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'ec9e8aa11bmsh01afb5356f556dep1d5473jsn3185f0830ed0',
		'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
	}
};

fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=apple', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

function Recipe() {
    return (
        <div>
            <h1>Cooking Inspiration</h1>
            <input 
                
                className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                // value={signupUserName} 
                // onChange={e => setSignupUserName(e.target.value)} 
                placeholder="Ingredient" />
        </div>
    )
}

export default Recipe;