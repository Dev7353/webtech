Vue.component('row-item', {
    template: `<div class='row'>
<div class='col-md-12'>
        <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
                    <col-item></col-item>
        </div>
            </div>`
})

Vue.component('col-item', {
    template: `<div class='tile'>
                    <img  class="img-responsive">
               </div>`
})

$(document).ready(function (){
    var chess = new Vue({
        el: '#chess',
        data: {
            elements: [
                {element: '0'},
                {element: '1'},
                {element: '2'},
                {element: '3'},
                {element: '4'},
                {element: '5'},
                {element: '6'},
                {element: '7'}
            ]
        }
    })

    let s = false

    $('.tile').each(function(i){
        if(i % 8 == 0 &&  i > 0){
            if(s === false){
                s = true
            }else {
                s = false
            }
        }
        if(s === false) {
            $(this).prop("class", "brownTile tile");
            $(this).prop("id", getID(i));


            s = true
        }
        else {
            $(this).prop("class", "whiteTile tile");
            $(this).prop("id", getID(i));
            s = false
        }
    })
    initializePieces()


})

function initializePieces(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if(i === 1){
                $('#' + i + '' + j).children().prop('src', "/assets/images/bauer_schwarz.png")
            }
            if(i === 0 && (j === 0 || j === 7)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/turm_schwarz.png")
            }
            if(i === 0 && (j === 1 || j === 6)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/laeufer_schwarz.png")
            }
            if(i === 0 && (j === 2 || j === 5)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/offizier_schwarz.png")
            }
            if(i === 0 && (j === 3)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/dame_schwarz.png")
            }
            if(i === 0 && (j === 4)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/koenig_schwarz.png")
            }

            if(i === 6){
                $('#' + i + '' + j).children().prop('src', "/assets/images/bauer.png")
            }
            if(i === 7 && (j === 0 || j === 7)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/turm.png")
            }
            if(i === 7 && (j === 1 || j === 6)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/laeufer.png")
            }
            if(i === 7 && (j === 2 || j === 5)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/offizier.png")
            }
            if(i === 7 && (j === 3)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/dame.png")
            }
            if(i === 7 && (j === 4)){
                $('#' + i + '' + j).children().prop('src', "/assets/images/koenig.png")
            }

            setProps(i, j)
        }
    }

}

function getID(i){
    if( i < 8){
        return "0" + i%8
    } else if(i < 16) {
        return "1" + i%8
    } else if(i < 24) {
        return "2" + i%8
    } else if(i < 32) {
        return "3" + i%8
    } else if(i < 40) {
        return "4" + i%8
    } else if(i < 48) {
        return "5" + i%8
    } else if(i < 56) {
        return "6" + i%8
    } else if(i < 64) {
        return "7" + i%8
    }

}

function getPath(){
    return "/assets/images/bauer_schwarz.png"
}

function setProps(i, j) {
    $('#' + i + '' + j).prop("x-coordinate", i);
    $('#' + i + '' + j + '>img').prop("x-coordinate", i)
    $('#' + i + '' + j).prop("y-coordinate", j);
    $('#' + i + '' + j + '>img').prop("y-coordinate", j)
}