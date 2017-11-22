function submitform() {
    let name1 = document.getElementById('name1').value;
    let name2 = document.getElementById('name2').value;
    window.location.href = "/login/:" + name1 + ":" + name2;
}
function sendData(coordinate, player, count) {
    // $.ajax({
    //     type: "GET",
    //     url: "/getMoves/:x:y:p:c"
    // });
}

$( document ).ready(function() {
    let count = 0;
    console.log( "Document is ready" );
    $('.img-responsive').click(function(){
        count++;
        console.log("Count wurde inkrementiert!")
    });
    $('.tile').click(function(){
        if(count === 1){
            //sendData
            console.log("Count ist 1!")
            //If coordinate is in received JSON, set Figure
            count = 0;
            console.log("Count wurde dekrementiert!");
        } else {
            console.log("Count ist 0!")
        }
    });
});


