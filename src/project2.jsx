"use strict";

let global;


function setup() {
  const middle = document.querySelector("#Middle");
  getData();
  global = {};
  global.LHS = document.querySelector("#LHS");
  global.categories = [];
  // ReactDOM.render(
  //   <Middle listposts={global.cat.categories[0].topicList} />,
  //   middle
  // );
}

function getData() {
  
  let path = "data/forum.json";
  fetch(path)
    .then((resp) => resp.json())
    .then((jsonResp) => {
      // console.log(jsonResp);
      global.categories = jsonResp.categories;
      renderLHS(jsonResp.categories);
    });
}

function renderLHS(json) {
  console.log(json);
  ReactDOM.render(
    <LHS categories={json} />, global.LHS);
}

class LHS extends React.Component {
  constructor() {
    super();
    this.state = {
      click: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
        click: true
      })
  }
  
  sayHi() {
    console.log("say hi");
  }
  render() {
    let category = this.props.categories;
    return (
      <div>
        <div>
          {category.map((cats, index) => (
            <button key={index} id={cats.id} onClick={this.handleClick}>
              {cats.name}
            </button>
          ))}
        </div>
        {this.state.click ? <Middle  /> : null}
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
    let topicList = global.categories[0].topicList;
    console.log(topicList);
    this.setState({ topics: topicList });
  }

  render() {
    console.log("render middle");
    let listPost = global.categories[0].topicList;
    return (
      <div>
        <p>test render</p>
        {listPost.map((posts, index) => (
          <p key={index}>{posts.text}</p>
        ))}
      </div>
    );
  }
}

setup();
