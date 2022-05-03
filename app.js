//DOM Manipulation
const search = document.getElementById("searchBeer");
const brewCards = document.querySelector("#brewCards");
const message = document.querySelector(".message");

// const updateUI = data => {
//   if (data.length > 0) {
//     data.forEach(brew => {
//       brewCards.insertAdjacentHTML(
//         "beforeend",
//         `
//           <div class="card m-2 mb-5 p-0">
//             <div class="card-header">${brew.name}</div>
//             <div class="card-body d-flex flex-column justify-content-between">
//               <div class="card-subtitle mb-2">Type: ${brew.brewery_type}</div>
//               <div>
//                 <p class="card-text m-0">Street: ${brew.street}</p>
//                 <p class="card-text m-0">City: ${brew.city}</p>
//                 <p class="card-text m-0">State: ${brew.state}</p>
//                 <p class="card-text m-0 text-muted">Zip: ${brew.postal_code}</p>
//               </div>
//               <a href="${brew.website_url}" class="btn btn-primary mt-3">Visit Site</a>
//             </div>
//           </div>
//         `
//       );
//     });
//   } else {
//     message.innerHTML = `
//     <div class="err">
//       <h1 class="display-1">Wasted!</h1>
//       <p class="lead fs-2">Looks like something went wrong.</p>
//       <p class="fs-5 text-muted">Make sure you have a "Search by:" catagory selected.</p>
//       <p class="fs-5 text-muted">Don't forget to check spelling too!</p>
//       <p class="fs-5 text-muted">If you've done everything right, there may not be breweries in that area...</p>
//     </div>
//     `;
//   }
// };

// //update info on submit
// search.addEventListener("submit", e => {
//   e.preventDefault();
//   message.innerHTML = "";
//   brewCards.innerHTML = "";
//   let searchMethod = search.searchMethod.value;
//   let searchTerm = search.searchTerm.value.trim();

//   if (searchMethod === "" || searchTerm == "") {
//     message.innerHTML = `
//     <div class="err">
//       <h1 class="display-1">Wasted!</h1>
//       <p class="lead fs-2">Looks like something went wrong.</p>
//       <p class="fs-5 text-muted">Make sure you have a "Search by:" catagory selected.</p>
//       <p class="fs-5 text-muted">Don't forget to check spelling too!</p>
//     </div>
//     `;
//   } else {
//     searchTerm = encodeURIComponent(
//       searchTerm
//         .split(" ")
//         .filter(item => item.length > 0)
//         .join(" ")
//     );

//     search.reset();

//     findBeer(base, searchMethod, searchTerm)
//       .then(data => updateUI(data))
//       .catch(err => console.log(err));
//   }
// });

search.addEventListener("submit", e => {
  e.preventDefault();
  if (search.stateCheck.checked) {
    console.log("state checked");
    console.log(search.stateCheck.value);
    console.log(search.stateSearch.value);
  } else {
    console.log("not checked");
  }
});
