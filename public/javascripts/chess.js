let count = 0;

$( document ).ready(function() {
    console.log("Document is ready!")
    registerClickListener()
});

function submitform() {
    let name1 = document.getElementById('name1').value;
    let name2 = document.getElementById('name2').value;
    window.location.href = "/login/:" + name1 + ":" + name2;
}

function sendData(x, y) {
    $.ajax({
        method: "GET",
        url: "/getMoves/:"+x+"/:"+y,
        dataType: "json",
        success: function(result) {
            for(let i = 0; i < result.moves.length; i++){
                $('#' + result.moves[i][0] + result.moves[i][1]).addClass("highlighted")
            }
            console.log("Success!")
        }
    })
}

function registerClickListener() {
    $('.img-responsive').click(function () {
        count++;
        console.log("Count wurde inkrementiert!")
        //Send data to Controller, receive possible moves
        sendData(this["x-coordinate"], this["y-coordinate"] )
        console.log(count);
    });
    $('.tile').click(function () {
        if (count === 1 && (this.children.length != 1)) {
            console.log("Count ist 1!")
            //If coordinate is in received JSON, set Figure
            count = 0;
            console.log("Count wurde dekrementiert!");
        } else if (count === 0) {
            console.log("Count ist 0!")
        }
    });
}


