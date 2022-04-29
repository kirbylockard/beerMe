const byPostalURL = "https://api.openbrewerydb.org/breweries?by_postal=";

const beerByZip = document.getElementById("beerByZip");

// async function start() {
//   const response = await fetch(`${brewList}`);
//   const data = await response.json();
//   console.log(data[0]);
// }

// start();

const findByPostal = /*async*/ function (url, zip) {
  fetch(`${url + zip}`)
    .then(res => res.json())
    .then(data => console.log("data from findByPostal", data)); //returns OBJECT array of objects

  // const response = await fetch(`${url + zip}`);
  // const data = await response.json();
  // return data; //returns promise
};

const createHTML = function (breweries) {
  console.log("type from createHTML", typeof breweries);
};

beerByZip.addEventListener("submit", e => {
  e.preventDefault();
  const zip = e.target.zip.value;
  data = findByPostal(byPostalURL, zip);
  console.log("logged data from event listener", data);
  createHTML(data);
});
