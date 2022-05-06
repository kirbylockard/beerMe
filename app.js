//DOM Manipulation
// const search = document.getElementById("searchBeer");
const brewCards = document.querySelector("#brewCards");
const message = document.querySelector(".message");
const editSearch = document.querySelector(".editSearch");
const editSearchForm = document.querySelector("#editSearchForm");
const startSearch = document.querySelector("#startSearch");
const modal = new bootstrap.Modal(document.querySelector(".modal"), {
  focus: true,
  keyboard: true
});
const loadMore = document.querySelector("#loadMore");

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
      <a href="${brew.website_url}" class="btn btn-primary mt-3" target="_blank" >Visit Site</a>
    </div>
  </div>
  `;
};
const wasted = `
<div class="err">
<h1 class="display-1">Wasted!</h1>
<p class="lead fs-2">Looks like something went wrong.</p>
<p class="fs-5 text-muted">Double check your search fields.</p>
<p class="fs-5 text-muted">Don't forget to check spelling too!</p>
<p class="fs-5 text-muted">If you've done everything right, there may not be breweries in that area...</p>
</div>
`;

let searchMethods = [];
let searchTerms = [];
let encodedTerms = [];
let page = 1;

const updateUI = data => {
  if (data.length > 0) {
    data.forEach(brew => {
      brewCards.insertAdjacentHTML("beforeend", createBrewCardTemplate(brew));
    });
  } else {
    message.innerHTML = `${wasted}`;
  }
};

//check.value == bystate=
//check.checked == true/false
//check.parentElement.nextElementSibling.value == search field
const validateForm = checks => {
  let errors = 0;
  let result = null;
  checks.forEach(check => {
    if (check.checked && check.parentElement.nextElementSibling.value.trim() !== "") {
      searchMethods.push(check.value);
      searchTerms.push(check.parentElement.nextElementSibling.value.trim());
    } else if (check.checked && check.parentElement.nextElementSibling.value.trim() === "") {
      //add warning to complete search field
      console.log(check.parentElement.parentElement.previousElementSibling.classList.remove("d-none"));
      errors += 1;
    }
  });
  if (errors > 0 || searchMethods.length === 0) {
    result = false;
  } else {
    result = true;
  }
  return result;
};

startSearch.addEventListener("click", e => {
  modal.show();
});

//EDIT
editSearchForm.addEventListener("submit", e => {
  e.preventDefault();
  console.log("submit from edit");
  //remove errors
  let errs = document.querySelectorAll(".err");
  errs.forEach(err => {
    err.classList.add("d-none");
  });
  //reset search info on submit
  searchMethods = [];
  searchTerms = [];
  const checks = editSearchForm.querySelectorAll(".form-check-input");

  if (validateForm(checks)) {
    message.innerHTML = "";
    brewCards.innerHTML = "";
    editSearch.classList.remove("d-none");
    page = 1;

    encodedTerms = searchTerms.map(term => {
      term = encodeURIComponent(
        term
          .split(" ")
          .filter(item => item.length > 0)
          .join(" ")
      );
      return term;
    });
    modal.hide();
    loadMore.parentElement.classList.remove("d-none");

    findBeer(searchMethods, encodedTerms, page)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  } else {
    return false;
  }
});

loadMore.addEventListener("click", () => {
  page++;
  //api call with page arg
  findBeer(searchMethods, encodedTerms, page)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});
