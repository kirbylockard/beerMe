//DOM Manipulation
const beerByZip = document.getElementById("beerByZip");
const brewCards = document.querySelector("#brewCards");

const updateUI = data => {
  data.forEach(brew => {
    brewCards.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card">
          <div class="card-header">${brew.name}</div>
          <div class="card-body">
            <div class="card-subtitle mb-2">${brew.brewery_type}</div>
            <p class="card-text m-0">${brew.street}</p>
            <p class="card-text m-0">${brew.city}</p>
            <p class="card-text m-0">${brew.state}</p>
            <p class="card-text m-0 text-muted">${brew.postal_code}</p>
            <a href="${brew.website_url}" class="btn btn-primary mt-3">Visit Site</a>
          </div>
        </div>
      `
    );
  });
};

//update info on submit
beerByZip.addEventListener("submit", e => {
  e.preventDefault();

  const zip = beerByZip.zip.value.trim();
  beerByZip.reset();
  findByPostal(byPostalURL, zip)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
