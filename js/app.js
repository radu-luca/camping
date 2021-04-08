let menuBtn = document.getElementById("menuBtn");
let navPanel = document.getElementById("navPanel");
let displayAllCampsBtn = document.getElementById("displayAll-btn");
let hideAllCamps = document.getElementById("hideAll-btn");

window.onresize=hideCollapsedNavBar();

menuBtn.addEventListener("click", onMenuClick);
window.addEventListener("resize", hideCollapsedNavBar);
displayAllCampsBtn.addEventListener("click", clearHiddenClass);
hideAllCamps.addEventListener("click", addHiddenClass);

function onMenuClick(event) {
  
if(navPanel.classList.contains("is--open")){navPanel.classList.remove("is--open");

}else{
  
  navPanel.classList.add("is--open");
}
}
function hideCollapsedNavBar(){
   let w=window.innerWidth;
    if(w>620){

         if(navPanel.classList.contains("is--open")){navPanel.classList.remove("is--open");
    }     
    }
}

function clearHiddenClass() {
    let imgs = document.getElementsByClassName("gallery__thumbnail");
    
    for(let index = 0; index < imgs.length; ++index)
        if(index > 2) {
            imgs[index].classList.remove("hidden");
        }
    
    displayAllCampsBtn.classList.add("hidden");
    hideAllCamps.classList.remove("hidden");
}

function addHiddenClass() {
    let imgs = document.getElementsByClassName("gallery__thumbnail");
    
    for(let index = 0; index < imgs.length; ++index)
        if(index > 2) {
            imgs[index].classList.add("hidden");
        }
    
    displayAllCampsBtn.classList.remove("hidden");
    hideAllCamps.classList.add("hidden");

    
}


