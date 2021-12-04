"use strict";

let global;

function setup() {
  getData();
  global = {};
  global.container = document.querySelector("#container");
  global.categories = [];
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
  ReactDOM.render(<LHS categories={json} />, global.container);
}

class LHS extends React.Component {
  constructor() {
    super();
    this.state = {
      click: false,
      currentCategory: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      click: true,
      currentCategory: e.target.id - 1,
    });
  }

  render() {
    let category = this.props.categories;
    return (
      <div className="container">
        <div className="LHS">
          {category.map((cats, index) => (
            <button key={index} id={cats.id} onClick={this.handleClick}>
              {cats.name}
            </button>
          ))}
        </div>
          {this.state.click ? (<Middle currentCategory={this.state.currentCategory} />) : null}
        </div>
    );
  }
}

class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // topics: [],
      click: false,
      post: null
    };
    this.handleMiddleClick = this.handleMiddleClick.bind(this);
  }

  getAllPost(topicList) {
    //array to be returned
    let totalCatPost = [];

    topicList.forEach((elem, index) => {
      console.log("elem" + elem.listPosts);
      //concat each listpost array to the totalCatPost array
      //(creates a mega post array with the post from all the list post of the category)
      totalCatPost = totalCatPost.concat(elem.listPosts);
    });

    console.log(totalCatPost);
    return totalCatPost;
  }

  handleMiddleClick(e) {
    // let topicList = global.categories[this.props.currentCategory].topicList;
    // let totalCatPost = this.getAllPost(topicList);

    let buttonPost = global.totalCatPost[e.target.id]
    // console.log("buttonPost: " + buttonPost.author)
    this.setState({
      click: true,
      post: buttonPost
    })
  }

  render() {
    console.log("render middle");
    let topicList = global.categories[this.props.currentCategory].topicList;
    global.totalCatPost = this.getAllPost(topicList);
 
    return (
      <div className="middle">
        {global.totalCatPost.map((post, index) => (
          <p key={index}>
            {post.author}: 
            {post.text}
            <button key={index} id={index} onClick={this.handleMiddleClick}>hello</button>
            
          </p>
        ))}
        {this.state.click ? (<RHS buttonPost={this.state.post}/> ) : null}
      </div>
    );
  }
}

class RHS extends React.Component {
  //post info needs to render here
  constructor(props) {
    super(props);
  }
  render() {
    let post = this.props.buttonPost;
    console.log(this.props.buttonPost);
    return (
      <div className="RHS">
        <p>{post.author} {post.rate}⭐ {post.date}</p>
        <p>{post.text}</p>
        <p>Replies: {post.replies}</p>
      </div>
    );
  }
}

setup();
