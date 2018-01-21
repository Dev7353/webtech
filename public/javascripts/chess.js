let count = 0;
var currentFigureX;
var currentFigureY;
var webSocket;
window.sr = ScrollReveal();


$( document ).ready(function() {
    console.log("Document is ready!")
    connectWebSocket()
    registerClickListener()
    sr.reveal('.tile', { duration: 500 }, 20);
});

function updateUi(cpx, cpy, x, y, currentPlayer){
    $('.highlighted').removeClass('highlighted');
    $('#' + x + y + ">img").remove()
    $('#' + cpx + cpy + ">img").appendTo($('#' + x + y))
    //$('#' + x + y + ">img").attr("id", x.toString() + y.toString())
    $('#' + x + y + ">img").prop("x-coordinate", x)
    $('#' + x + y + ">img").prop("y-coordinate", y)
    // Change the display of currently active player
    console.log("Update Player: " + $('#playerB').text().replace(/\s/g,'') + " Input: " + currentPlayer)
    if($('#playerB').text().replace(/\s/g,'') === currentPlayer.replace(/\s/g,'')) {
        $('#playerA').removeClass("panel-success");
        $('#playerB').addClass("panel-success");
    } else {
        $('#playerB').removeClass("panel-success");
        $('#playerA').addClass("panel-success");
    }
}

function getHighlight(x, y) {

    $.ajax({
        method: "GET",
        url: "/getMoves/:"+x+"/:"+y,
        dataType: "json",
        success: function(result) {
            if(result.moves.length != 0) {
                $('.highlighted').removeClass('highlighted');
                for(let i = 0; i < result.moves.length; i++){
                    let x = result.moves[i][0]
                    let y = result.moves[i][1]
                    $('#' + x + y).addClass("highlighted")
                }
            } else {
                count = 0;
            }
        }
    })
}
function moveFigure(cpx, cpy, x, y) {
    $.ajax({
        method: "GET",
        url: "/moveFigure/:"+ cpx + "/:" + cpy + "/:" + x + "/:" + y,
        dataType: "text",
        success: function(result) {
            console.log("Moved the figure from " + cpx + cpy + " to " + x + y)
        }
    })
    webSocket.send("heheh >:D")
}

function registerClickListener() {
    $('.img-responsive').click(function () {

        if(count === 1 && $(this).parent().hasClass('highlighted')) {
            $('.highlighted').removeClass('highlighted');
            moveFigure(currentFigureX, currentFigureY, this["x-coordinate"], this["y-coordinate"])
            count = 0
            return;
        }
        //If figure is clicked for the first time, highlight tiles
        currentFigureX = this["x-coordinate"]
        currentFigureY = this["y-coordinate"]

        count++;
        console.log("Count wurde inkrementiert!")
        //Send data to Controller, receive possible moves
        getHighlight(this["x-coordinate"], this["y-coordinate"] )
        console.log("X: "+ this["x-coordinate"] + " Y: " + this["y-coordinate"])
        console.log("Image count: " + count);
    });
    $('.tile').click(function () {
        console.log("Tile count: " + count)
        if (count === 1 && $(this).hasClass("highlighted")) {
            console.log("Count ist 1!")
            //If coordinate is in received JSON, set Figure
            moveFigure(currentFigureX, currentFigureY, this["x-coordinate"], this["y-coordinate"])
            count = 0;
            console.log("Count wurde dekrementiert!");
        } else if (count === 0) {
            console.log("Count ist 0!")
        }
    });
}

function connectWebSocket() {
    webSocket = new WebSocket("ws://localhost:9000/socket");
    webSocket.onopen = function(){
        console.log("Connected to Websocket!");
    }
    webSocket.onmessage = function(e){
        if (typeof e.data === "string") {
            console.log("Data: " + e.data)
            let cpx = parseInt(e.data.charAt(1))
            let cpy = parseInt(e.data.charAt(3))
            let x = parseInt(e.data.charAt(6))
            let y = parseInt(e.data.charAt(8))
            let currentPlayer = e.data.substring(10, e.data.length);
            updateUi(cpx, cpy, x, y, currentPlayer)
        }
    }
    webSocket.onerror = function(error){
        console.log("Error in Websocket occured: " + error)
    }
    webSocket.onclose = function(){
        console.log("Bye bye socket!")
        console.log("Try to connect Websocket ...")
        connectWebSocket()
    }
}




