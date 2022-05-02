//Interacting with API

const byPostalURL = "https://api.openbrewerydb.org/breweries?by_postal=";

const findByPostal = async function (url, zip) {
  const response = await fetch(`${url + zip}`); //returns a promise
  const data = await response.json();
  return data;
};
