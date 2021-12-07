/**
 * @atuhor Santiago Luna
 * @author Matthew Toledo
 *
 */

"use strict";

//global variable to store json object
let global;

/**
 * @author Matthew Toledo
 * @func setup
 * @description this function initializes the global variable, creates a global container variable and categories variable, calls the getData function.
 */
function setup() {
  getData();
  global = {};
  global.container = document.querySelector("#container");
  global.categories = [];
}

/**
 * @author Matthew Toledo, Santiago Luna
 * @func getData
 * @description this function fetches the data from the json obj and passes it to the global categories and to the renderLHS function.
 */
function getData() {
  let path = "data/forum.json";
  fetch(path)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("no data found :" + resp.status);
      } else {
        return resp.json();
      }
    })
    .then((jsonResp) => {
      global.categories = jsonResp.categories;
      renderLHS(jsonResp.categories);
    })
    .catch((error) => console.log(error));
}

/**
 * @author  Santiago Luna
 * @func renderLHS
 * @param {JSON object} json
 * @description this function  uses react to render the LHS passing through the json object as a props to the react component and rendering it in the global container.
 */
function renderLHS(json) {
  ReactDOM.render(<LHS categories={json} />, global.container);
}

/**
 * @author Santiago Luna
 * @class LHS
 * @description
 */
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

/**
 *
 * @class RHS
 * @author Matthew toledo
 * @description This class takes in a post as props and and when rendered
 *  will return the full details of the post
 *  
 */

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
setup();
