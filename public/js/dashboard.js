let editBtn = document.getElementById("editBtn");
let submitBtn = document.getElementById("submitBtn");

editBtn.addEventListener("click", makeFormEditable);
submitBtn.addEventListener("click", updateInfo);

function updateInfo() {
    console.log("Updating...");
}

function makeFormEditable() {
    let inputs = document.getElementsByTagName("input");
    for(let index = 0; index < inputs.length; ++index) {
        inputs[index].readOnly = false;
    }

    editBtn.classList.add("hidden");
    submitBtn.classList.remove("hidden");
}