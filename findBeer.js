//Interacting with API

const base = "https://api.openbrewerydb.org/breweries?";

const findBeer = async function (searchMethods, encodedTerms, page) {
  //build query
  let query = "";
  for (let i = 0; i < searchMethods.length; i++) {
    if (i === 0) {
      query = query + searchMethods[i] + encodedTerms[i];
    } else {
      query = query + "&" + searchMethods[i] + encodedTerms[i];
    }
  }
  query = query + `&page=${page}`;
  const response = await fetch(`${base + query}`); //returns a promise
  console.log(response);
  const data = await response.json();
  return data;
};
