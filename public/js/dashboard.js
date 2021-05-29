let editBtn = document.getElementById("editBtn");
let submitBtn = document.getElementById("submitBtn");

editBtn.addEventListener("click", makeFormEditable);
submitBtn.addEventListener("click", updateInfo);

// document.getElementById("myBtn").addEventListener("click", displayDate);

function updateInfo() {
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let obj = {name: name, phone: phone, email: email};
    console.log(document.URL);
    postData(document.URL,obj);
    // .then(result=>{
    //     console.log(result);
    // })
}

function makeFormEditable() {
    let inputs = document.getElementsByTagName("input");
    for(let index = 0; index < inputs.length; ++index) {
        inputs[index].readOnly = false;
    }

    editBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
}

// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      // redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  