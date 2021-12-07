/**
 * @atuhor Santiago Luna
 * @author Matthew Toledo
 *
 */

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
      currentCategory: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
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
        {this.state.currentCategory !== null ? (
          <Middle currentCategory={this.state.currentCategory} />
        ) : null}
      </div>
    );
  }
}

class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      currentCategory: null,
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

    //this resets the RHS when the category is changed
    if (this.state.currentCategory !== this.props.currentCategory) {
      this.setState({
        post: null,
        currentCategory: this.props.currentCategory,
      });
    }

    return totalCatPost;
  }

  handleMiddleClick(e) {
    let buttonPost = global.totalCatPost[e.target.id];
    this.setState({
      post: buttonPost,
    });
  }

  render() {
    console.log("render middle");
    let topicList = global.categories[this.props.currentCategory].topicList;
    global.totalCatPost = this.getAllPost(topicList);

    return (
      <>
        <div className="middle">
          {global.totalCatPost.map((post, index) => (
            <p key={index} className="postTitle">
              <p className="bold">{post.author}:</p> {post.text}
              <button key={index} id={index} onClick={this.handleMiddleClick}>
                show
              </button>
            </p>
          ))}
        </div>
        {this.state.post !== null ? <RHS buttonPost={this.state.post} /> : null}
      </>
    );
  }
}

class RHS extends React.Component {
  //post info needs to render here
  constructor(props) {
    super(props);
    this.state = {
      click: false,
    };
  }
  render() {
    let post = this.props.buttonPost;
    console.log(this.props.buttonPost);
    return (
      <div className="RHS">
        <p>
          Author: {post.author}
          <br />
          Rating: {post.rate}⭐<br />
          Post Date: {post.date}
        </p>
        <p>{post.text}</p>
        <p>Replies: {post.replies}</p>
      </div>
    );
  }
}

// class Main extends React.Component {
//   constructor(props){
//     super(props);
//   }

//   render(){
//     let json = this.props.json;

//     return(
//       <div>
//         <LHS categories={json} />
//         <Middle
//       </div>
//     );
//   }
//}

setup();
