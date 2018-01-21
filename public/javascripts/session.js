var playername
$(document).ready(function(){
    window.sr = ScrollReveal();
    sr.reveal(".ruleset");
    playername = $('#playername').text()
    $('#start').click(function(){
        $('#queueText').css("visibility", "visible");
        $('#queueText').fadeTo(300, 1)
        connectSessionSocket();
    })
})

function connectSessionSocket() {
    socket = new WebSocket("ws://localhost:9000/SessionSocket");
    socket.onopen = function () {
        console.log("Open to connect SessionSocket ...");
        socket.send(playername)
    }
    socket.onmessage = function (e) {
        if (typeof e.data === "string" && e.data === "READY") {
            //.. start game
            window.location.replace("http://localhost:9000/game");
        } else if(typeof e.data === "string" && e.data === "WAIT"){
            console.log("waiting ...") //TODO: Give feedback to user
        }
    }
    socket.onerror = function (error) {
        console.log("Error in SessionSocket occured: " + error)
    }
    socket.onclose = function () {
        console.log("Bye bye SessionSocket!")
    }


}
// Animations
// Wrap every letter in a span
$('.ml1 .letters').each(function(){
    $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

anime.timeline({loop: false})
    .add({
        targets: '.ml1 .letter',
        scale: [0.3,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 600,
        delay: function(el, i) {
            return 70 * (i+1)
        }
    }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: function(el, i, l) {
        return 80 * (l - i);
    }
});