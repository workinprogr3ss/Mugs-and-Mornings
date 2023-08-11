// Get the objects we need to modify
let updateCustomerForm = document.getElementById("update-customer-form-ajax");

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get form fields we need to get data from
  let inputID = document.getElementById("idSelect");
  let inputName = document.getElementById("input-name-update");
  let inputEmail = document.getElementById("input-email-update");
  let inputPhoneNumber = document.getElementById("input-phoneNumber-update");
  let inputBirthday = document.getElementById("input-birthday-update");

  // Get the values from the form fields
  let idValue = inputID.value;
  let nameValue = inputName.value;
  let emailValue = inputEmail.value;
  let phoneNumberValue = inputPhoneNumber.value;
  let birthdayValue = inputBirthday.value;

  // Put our data we want to send in a javascript object
  let data = {
    id: idValue,
    name: nameValue,
    email: emailValue,
    phoneNumber: phoneNumberValue,
    birthday: birthdayValue,
  };
  if (isNaN(idValue)) {
    console.log("id nan");
    console.log(idValue);
    return;
  }
  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("PUT", "/put-customer-ajax", true);
  xhttp.setRequestHeader("Content-type", "application/json");

  // Tell our AJAX request how to resolve
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      // Add the new data to the table
      updateRow(xhttp.response, idValue);
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log("There was an error with the input.");
    }
  };

  // Send the request and wait for the response
  xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
  let parsedData = JSON.parse(data);

  let table = document.getElementById("customers-table");

  for (let i = 0, row; (row = table.rows[i]); i++) {
    //iterate through rows
    //rows would be accessed using the "row" variable assigned in the for loop
    if (table.rows[i].getAttribute("data-value") == customerID) {
      // Get the location of the row where we found the matching person ID
      let updateRowIndex = table.getElementsByTagName("tr")[i];

      // Get td of homeworld value
      let tdName = updateRowIndex.getElementsByTagName("td")[1];
      let tdEmail = updateRowIndex.getElementsByTagName("td")[2];
      let tdPhoneNumber = updateRowIndex.getElementsByTagName("td")[3];
      let tdBirthday = updateRowIndex.getElementsByTagName("td")[4];

      // Reassign homeworld to our value we updated to
      tdName.innerHTML = parsedData[0].name;
      tdEmail.innerHTML = parsedData[0].email;
      tdPhoneNumber.innerHTML = parsedData[0].phoneNumber;
      tdBirthday.innerHTML = parsedData[0].birthday;
    }
  }
}
