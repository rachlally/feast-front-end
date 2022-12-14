# WasteNot Kitchen Tracker

## Description

The motiviation for creating this application was to help users better organize and track products in their kitchen(s).  Users can input their kitchen locations, storage locations, and what products are in those locations.  Once this information is added, users can easily track products through the application. 

The ultimate goal is waste prevention.  This is done through encouraging users to consume products in their kitchen through the recipe search.  Or encouraging users to donate products to nearby food banks through the Google Maps search.

While creating the front end application, the developers learned how to use Create-React.  They gained more experience with retrieving, adding, and deleting data through GET, POST and DELETE routes.  The developers successfully deployed to Netlify.  They learned how to connect their deployed Heroku API with the front end application.

## Table of Contents

- [Installation](#installation)
- [Technology](#technology)
- [Usage](#usage)
- [Screenshot](#screenshot)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)


## Installation

To install, fork or clone the repository from https://github.com/rachlally/feast-front-end.  Run `npm install` for package installation.  Run `npm start` to start the Create-React-Application.

Link to the back-end repo at https://github.com/rachlally/feast-back-end.

## Technology 

This application is a Create-React Application.  JSON Web Tokens was installed to secure information retrieval and authorization between client and server. BCrypt was installed to hash user's passwords.  TaillwindCSS was used as the styling framework.

Google MAPs API was used for Food Bank search.  Edamam Recipe API was used for recipe inspiration search.

## Usage

View the deployed WasteNot application at: https://wastenotkitchentracker.netlify.app/ .

View the API at the deployed link: https://wastenot.herokuapp.com/.

First time users are prompted to create an account.  Returning users will login with their information.  Upon signing in, users can view their different kitchen locations by name and zipcode.  This is where users can add a new kitchen.  Next, users can view what is saved to each kitchen.  On this page, users can view what products are in their kitchen, organized by different location types (ie Freezer, Refrigerator, Pantry, etc.).

Users are encouraged to use what products they have.  This is done by the Edamam Recipe search included on this page.  Users can also save products to a shopping list.  They can also save items to a donation list and easily search nearby Food Bank location with the Google Map search.

## Screenshot

![Deployed API](DeployedAPI.png)

## Credits

A huge thank you to our TAs with the UW Coding Bootcamp.  Special thanks to Lindsay Fitzgerald for her assistance.

Developers of this application:

Andrew Massey https://github.com/amassey42

Nathan Alexander https://github.com/NathanAlexander1

Philip Schreiber https://github.com/Sullisters

Rachel Lally https://github.com/rachlally


## License

MIT License

Copyright (c) 2022 rachlally

## How to Contribute

To contribute, contact the developers through links above.

![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)
