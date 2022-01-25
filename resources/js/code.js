
var sky, middle, front, title;

function init(){
    sky = document.getElementById("sky");
    middle = document.getElementById("middle");
    front = document.getElementById("front");
    title = document.getElementById("titleText");

    title.style.top = 0;

    initListeners();
}

function initListeners(){
    window.addEventListener("scroll", function() {
        let scrollValue = this.window.scrollY;
        title.style.top = scrollValue*1.05 + 'px';
        sky.style.top = scrollValue*0.6 + 'px';
        middle.style.top = scrollValue*0.3 + 'px';
    });
}

init();
