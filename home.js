let mainImg = document.getElementById("main-img");
let images = document.getElementsByClassName("header-img");

for(let i=0; i < images.length; i++){
    images[i].addEventListener("click", function() {
        mainImg.src = this.src;
    });
}
