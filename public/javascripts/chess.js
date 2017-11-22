function submitform() {
    let name1 = document.getElementById('name1').value;
    let name2 = document.getElementById('name2').value;
    window.location.href = "/login/:" + name1 + ":" + name2;
}
function sendData(coordinate, player, count) {
    $.ajax({
        type: "GET",
        url: "/getMoves/:x:y:p:c"
    });
}

$( document ).ready(function() {
    console.log( "Document is ready" );
    $('.img-responsive').click(function(){
        //sendData(coordinate, player, count);
    });
});


