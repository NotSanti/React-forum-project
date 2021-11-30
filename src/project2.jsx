"use strict";

let global = {};
global.LHS = document.querySelector("#LHS");

function setup() {
  const middle = document.querySelector("#Middle");
  getData();
  ReactDOM.render(
    <Middle listposts={global.cat.categories[0].topicList} />,
    middle
  );
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
          <button key={index} id={cats.id} onClick={}>
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

  getData() {
    let topiclist = global.cat[0].topicList;
    console.log(topiclist);
    this.setState({ topics: topiclist });
  }

  render() {
    let listposts = this.state.topics;
    return (
      <div>
        {listposts.map((posts, index) => (
          <p key={index}>{posts.text}</p>
        ))}
      </div>
    );
  }
}

setup();
