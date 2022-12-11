import React, {useEffect} from 'react'
// import '../styles/Recipe.css';

function Recipe() {

    getRecipe = (e) => {
        e.preventDefault();
        console.log("Working")
    }
//     const [ingredientSearch, setRecipe] = useState([''])

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ec9e8aa11bmsh01afb5356f556dep1d5473jsn3185f0830ed0',
// 		'X-RapidAPI-Host': 'edamam-food-and-grocery-database.p.rapidapi.com'
// 	}
// };

// useEffect(()=>{
//     fetch('https://edamam-food-and-grocery-database.p.rapidapi.com/parser?ingr=' + ingredientSearch , options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
//     setRecipe()

// }, []);

    return (
        <div>
            <h1>Cooking Inspiration</h1>
            <input 
                type='text'
                className="form-control block px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" 
                // value={} 
                onChange={e => (e.target.value)} 
                placeholder="Ingredient" />
        </div>
    )
}

export default Recipe;