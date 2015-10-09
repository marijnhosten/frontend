

document.addEventListener("DOMContentLoaded", init);

function init(){
    var saveBtn = document.querySelector("button");
    //var clearBtn = document.querySelectorAll("button")[1];
    saveBtn.addEventListener("click", save);

    function save(){
        alert(saySomething());
    }
}