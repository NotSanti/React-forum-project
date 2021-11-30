"use strict";

let global = {};
global.LHS = document.querySelector("#LHS");

function setup() {
  getData();
}

function getData() {
  global.categories = [];
  let path = "data/forum.json";
  fetch(path)
    .then((resp) => resp.json())
    .then((jsonResp) => {
      // console.log(jsonResp);
      global.cat = jsonResp;
      renderLHS(jsonResp.categories);
    });
}

function renderLHS(json) {
  console.log(json);
  ReactDOM.render(<Buttons categories={json} />, global.LHS);
}

class Buttons extends React.Component {

  constructor(props)
  getPosts(e) {
    
  }

  render() {
    let cat = this.props.categories;
    return (
      <div>
        {cat.map((cats, index) => (
          <button key={index} id={cats.id}>
            {cats.name}
          </button>
        ))}
      </div>
    );
  }
}

setup();
