"use strict";

let global = {};
function setup() {
    global.categories = [];
    let path = 'data/forum.json'
    fetch(path)
    .then( resp => resp.json())
    .then (jsonResp => {
        console.log(jsonResp);
        jsonResp.forEach(x => {
            console.log(x)
        });
    } );
}

setup();