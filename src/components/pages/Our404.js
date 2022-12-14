import React from "react";

function Our404() {
  return (
    <>
      <div className="flex flex-col content-center">
        <h1>ERROR: 404...WRONG PAGE!</h1>
        <h2>
          We worked hard to help you keep track of your kitchens, but you seemed
          to have gotten lost anyway...please navigate back to a site page using
          the above menu or the burger monster will get you!
        </h2>
        <img
          className="w-96"
          src="https://www.happyfoodstube.com/wp-content/uploads/2020/10/halloween-monster-burgers-recipe.jpg?fm=jpg"
          alt="Burger Monster"
        />
      </div>
    </>
  );
}

export default Our404;
