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
  console.log(data);
  return data;
};

//UniversalTutorial API Token
//xgb0ZAnpXGIckE66A39FjBw9akzF0vozFTGNrxFfrLRDKF3zcfl5p__xGVaMeCnpAZQ

const getToken = async function () {
  const response = await fetch("https://www.universal-tutorial.com/api/getaccesstoken", {
    headers: new Headers({ Accept: "application/json", "api-token": "xgb0ZAnpXGIckE66A39FjBw9akzF0vozFTGNrxFfrLRDKF3zcfl5p__xGVaMeCnpAZQ", "user-email": "kirbylockard@gmail.com" })
  });
  return response.json();
};

const getLocations = async function (token) {
  const response = await fetch("https://www.universal-tutorial.com/api/states/United States", {
    headers: new Headers({ Authorization: `Bearer ${token}`, Accept: "application/json" })
  });
  const data = await response.json();
  console.log(data);
};

getToken().then(data => getLocations(data.auth_token));
