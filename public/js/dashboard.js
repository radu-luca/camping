let editBtn = document.getElementById("editBtn");
let submitBtn = document.getElementById("submitBtn");

editBtn.addEventListener("click", makeFormEditable);
submitBtn.addEventListener("click", updateInfo);

// document.getElementById("myBtn").addEventListener("click", displayDate);

function updateInfo() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let obj = { name: name, phone: phone, email: email };

  fetch(document.URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }).then(data => data.json())
    .then(dataJson => {
      window.location.href = "http://localhost:5000/profile/" + dataJson.id
    })

}

function makeFormEditable() {
  let inputs = document.getElementsByTagName("input");
  for (let index = 0; index < inputs.length; ++index) {
    inputs[index].readOnly = false;
  }

  editBtn.classList.add("hidden");
  submitBtn.classList.remove("hidden");
}
