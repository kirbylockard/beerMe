//Interacting with API

const base = "https://api.openbrewerydb.org/breweries?by_city=";

const findBeer = async function (url, zip) {
  const response = await fetch(`${url + zip}`); //returns a promise
  const data = await response.json();
  return data;
};
