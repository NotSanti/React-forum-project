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
  ReactDOM.render(<LHS categories={json} />, global.LHS);
}

class LHS extends React.Component {
  sayHi() {
    console.log("say hi");
  }
  render() {
    let cat = this.props.categories;
    return (
      <div>
        {cat.map((cats, index) => (
          <button key={index} id={cats.id} onClick={renderMiddle()}>
            {cats.name}
          </button>
        ))}
      </div>
    );
  }
}

class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
    };
  }

  getData() {}

  render() {
    let listposts = this.props.listposts;
    return (
      <div>
        {listposts.map((posts, index) => (
          <p key={index}>{posts.text}</p>
        ))}
      </div>
    );
  }
}

function renderMiddle() {
  const middle = document.querySelector("#Middle");
  ReactDOM.render(
    <Middle listposts={global.cat.categories[0].topicList} />,
    middle
  );
}
setup();
