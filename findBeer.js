//Interacting with API

const base = "https://api.openbrewerydb.org/breweries?";

const findBeer = async function (base, searchMethod, searchTerm) {
  //check search method
  if (searchMethod === "state") {
    searchMethod = "by_state=";
  } else if (searchMethod === "city") {
    searchMethod = "by_city=";
  } else if (searchMethod === "zip") {
    searchMethod = "by_postal=";
  }
  console.log(searchMethod);
  const response = await fetch(`${base + searchMethod + searchTerm}`); //returns a promise
  const data = await response.json();
  return data;
};
