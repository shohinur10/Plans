cconsole.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return ` 
    <li class="list-group-item list-group-item-indo d-flex align-items-center justify-content-between">
      <span class="item-text">${item.reja}</span>
      <div>
        <button data-id="${item._id}" class="btn btn-dark btn-md">Edit</button>
        <button data-id="${item._id}" class="btn btn-dark btn-md">Delete</button>
      </div>
    </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Move this inside the function

  axios
    .post("/create-item", { reja: createField.value }) // Fixed API endpoint
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("Please try again");
    });
});
