Vue.component('row-item', {
    template: `<div class='row'>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
            <col-item></col-item>
        </div>`
})

Vue.component('col-item', {
    template: "<div class='col-md-12'><div class='brownTile tile'></div></div>"
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
})