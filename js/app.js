let menuBtn = document.getElementById("menuBtn");
let navPanel = document.getElementById("navPanel");
window.onresize=hideCollapsedNavBar();

menuBtn.addEventListener("click", onMenuClick);
window.addEventListener("resize", displayWindowSize);


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