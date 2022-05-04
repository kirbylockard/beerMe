//DOM Manipulation
const search = document.getElementById("searchBeer");
const brewCards = document.querySelector("#brewCards");
const message = document.querySelector(".message");
const editSearch = document.querySelector(".editSearch");

const createBrewCardTemplate = brew => {
  return `
  <div class="card m-2 mb-5 p-0">
    <div class="card-header">${brew.name}</div>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="card-subtitle mb-2">Type: ${brew.brewery_type}</div>
      <div>
        <p class="card-text m-0">Street: ${brew.street}</p>
        <p class="card-text m-0">City: ${brew.city}</p>
        <p class="card-text m-0">State: ${brew.state}</p>
        <p class="card-text m-0 text-muted">Zip: ${brew.postal_code}</p>
      </div>
      <a href="${brew.website_url}" class="btn btn-primary mt-3">Visit Site</a>
    </div>
  </div>
  `;
};
const wasted = `
<div class="err">
<h1 class="display-1">Wasted!</h1>
<p class="lead fs-2">Looks like something went wrong.</p>
<p class="fs-5 text-muted">Make sure you have a "Search by:" catagory selected.</p>
<p class="fs-5 text-muted">Don't forget to check spelling too!</p>
<p class="fs-5 text-muted">If you've done everything right, there may not be breweries in that area...</p>
</div>
`;

let searchMethods = [];
let searchTerms = [];

const updateUI = data => {
  if (data.length > 0) {
    data.forEach(brew => {
      brewCards.insertAdjacentHTML("beforeend", createBrewCardTemplate(brew));
    });
  } else {
    message.innerHTML = `${wasted}`;
  }
};

//update info on submit
search.addEventListener("submit", e => {
  e.preventDefault();
  message.innerHTML = "";
  brewCards.innerHTML = "";
  editSearch.classList.remove("d-none");
  //reset search info on submit
  searchMethods = [];
  searchTerms = [];
  const checks = search.querySelectorAll(".form-check-input");

  //validateForm()
  //if searches are incomplete
  //  display warnings on appropriate search fields
  //  return false to entire event

  //check.value == bystate=
  //check.checked == true/false
  //check.parentElement.nextElementSibling.value == search field
  //iterate all check boxes in form
  checks.forEach(check => {
    if (check.checked && check.parentElement.nextElementSibling.value.trim() !== "") {
      searchMethods.push(check.value);
      searchTerms.push(check.parentElement.nextElementSibling.value.trim());
    }
  });

  let encodedTerms = searchTerms.map(term => {
    term = encodeURIComponent(
      term
        .split(" ")
        .filter(item => item.length > 0)
        .join(" ")
    );
    return term;
  });

  findBeer(searchMethods, encodedTerms)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
