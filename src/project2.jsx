"use strict";

let global = {};
function setup() {
  global.categories = [];
  let path = "data/forum.json";
  fetch(path)
    .then((resp) => resp.json())
    .then((jsonResp) => {
      console.log(jsonResp);
      global.cat1 = jsonResp.categories[0];
      global.cat2 = jsonResp.categories[1];
      global.cat3 = jsonResp.categories[2];
    });
}

setup();
