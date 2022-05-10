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
const stateList = document.querySelector("#stateSearch");
const cityList = document.querySelector("#citySearch");
const stateCheck = document.querySelector("#stateCheck");
const cityCheck = document.querySelector("#cityCheck");
const checks = document.querySelectorAll(".form-check-input");

const createBrewCardTemplate = brew => {
  for (let [key, value] of Object.entries(brew)) {
    if (value === null) {
      brew[`${key}`] = "*unavailable*";
    }
  }
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
<p class="fs-5 text-muted">There may not be breweries matching your search...</p>
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
    swapLoad();
    message.innerHTML = `${wasted}`;
  }
};

//Populate dropdown with states
const populateDropdown = function (dropdown, propName, data) {
  if (dropdown === cityList) {
    dropdown.innerHTML = "<option selected>Choose a City</option>";
  }
  data.forEach(location => {
    dropdown.innerHTML += `<option value="${location[propName]}">${location[propName]}</option>`;
  });
};

getToken()
  .then(data => getLocations(data.auth_token, statesURL, "United States"))
  .then(data => populateDropdown(stateList, "state_name", data))
  .catch(err => console.log(err));

stateList.addEventListener("change", e => {
  let state = stateList.value;
  getToken()
    .then(data => getLocations(data.auth_token, citiesURL, state))
    .then(data => populateDropdown(cityList, "city_name", data));
});

//DISABLE DROPDOWNS IF NOT CHECKED
checks.forEach(check => {
  check.addEventListener("change", () => {
    if (check.checked) {
      check.parentElement.nextElementSibling.disabled = false;
    } else {
      check.parentElement.nextElementSibling.disabled = true;
    }
  });
});

//ENABLE OR DISABLE CITY BASED ON STATE
stateCheck.addEventListener("change", () => {
  if (stateCheck.checked) {
    cityCheck.disabled = false;
  } else {
    cityCheck.disabled = true;
  }
});

//check.value == bystate=
//check.checked == true/false
//check.parentElement.nextElementSibling.value == search field
const validateForm = checks => {
  let errors = 0;
  let result = null;
  checks.forEach(check => {
    if (check.disabled === true) {
      return;
    } else if (check.checked && !check.parentElement.nextElementSibling.value.includes("Choose a ")) {
      searchMethods.push(check.value);
      searchTerms.push(check.parentElement.nextElementSibling.value);
    } else if (check.checked && check.parentElement.nextElementSibling.value.includes("Choose a ")) {
      //add warning to complete search field
      check.parentElement.parentElement.previousElementSibling.classList.remove("d-none");
      errors += 1;
    } else if (searchMethods.length === 0) {
      //add form instructions
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

    modal.hide();
    lastDrop.classList.add("d-none");
    swapLoad();

    findBeer(searchMethods, searchTerms, page)
      .then(data => updateUI(data))
      .catch(err => console.log(err));
  } else {
    return false;
  }
});

const swapLoad = function () {
  loadMore.classList.toggle("d-none");
};
const swapDrop = function () {
  lastDrop.classList.toggle("d-none");
};

loadMore.addEventListener("click", () => {
  page++;
  //api call with page arg
  findBeer(searchMethods, searchTerms, page)
    .then(data => {
      if (data.length === 0) {
        swapDrop();
        swapLoad();
      } else {
        updateUI(data);
      }
    })
    .catch(err => console.log(err));
});
