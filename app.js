//DOM Manipulation
const search = document.getElementById("searchBeer");
const brewCards = document.querySelector("#brewCards");

const updateUI = data => {
  data.forEach(brew => {
    brewCards.insertAdjacentHTML(
      "beforeend",
      `
        <div class="card m-2 p-0">
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
search.addEventListener("submit", e => {
  e.preventDefault();

  let searchTerm = search.searchTerm.value.trim();
  searchTerm = encodeURIComponent(
    searchTerm
      .split(" ")
      .filter(item => item.length > 0)
      .join(" ")
  );

  search.reset();
  findBeer(base, searchTerm)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
