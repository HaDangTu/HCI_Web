function onFinishClick(event) {
    window.open("Result.html", "_self");
}


function keyUp(event, next){
    var keyCodeNumber = [48, 49, 50, 51, 52, ,53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    if (keyCodeNumber.includes(event.keyCode)){
        document.getElementById("text" + next).focus();
    }
    return;
}