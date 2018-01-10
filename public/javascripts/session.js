$(document).ready(function(){
    $('#start').click(function(){
        connectSessionSocket()
    })
})

function connectSessionSocket() {
    socket = new WebSocket("ws://localhost:9000/SessionSocket");
    socket.onopen = function () {
        console.log("Open to connect SessionSocket ...");
        socket.send("TEST")
    }
    socket.onmessage = function (e) {
        if (typeof e.data === "string") {
            //.. start game
            window.location.replace("http://localhost:9000/game");
        }
    }
    socket.onerror = function (error) {
        console.log("Error in SessionSocket occured: " + error)
    }
    socket.onclose = function () {
        console.log("Bye bye SessionSocket!")

    }


}