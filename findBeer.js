//Interacting with API

const base = "https://api.openbrewerydb.org/breweries?";

const findBeer = async function (base, searchMethod, searchTerm) {
  const response = await fetch(`${base + searchMethod + searchTerm}`); //returns a promise
  const data = await response.json();
  return data;
};
