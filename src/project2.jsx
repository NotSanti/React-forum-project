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
 * @param {JSON object} categories
 * @class LHS
 * @description takes in the currentcategory as a prop to identify which category was clicked, using the handle click function.
 * It returns a container div containing the LHS div which has 3 child buttons that use the props to contain the category name.
 * When the buttons are clicked they fire the handle click method which changes the state of the currentCategory and passes that state to the Middle component in the render.
 * When rendering it uses the state to check if its populated before rendering the Middle component to re render it each time.
 */
class LHS extends React.Component {
  constructor() {
    super();
    this.state = {
      currentCategory: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }


  /**
   * @author Matthew Toledo
   * @param {event} e 
   * @description event handler for the click on the category buttons.
   *  When clicked, the currentCategory sate is set the the id -1 of the target
   *  (corresponds to category of the button).
   */
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

/**
 * @author Matthew Toledo, Santiago Luna
 * @class Middle
 * @param {JSON object} currentCategory
 * @description renders the middle component that contains all the listposts of the current category passed in as a prop.
 * Calls the RHS component to render it in a jsx fragment.
 *
 */
class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      currentCategory: null,
    };
    this.handleMiddleClick = this.handleMiddleClick.bind(this);
  }

  /**
   * @author Matthew Toledo, Santigo Luna
   * @param {array of JSON object} topicList
   * @returns {array of JSON obj} totalCatPost
   * @description takes in a topic list and goes inside each listpost and retrives
   * all the post. The post are added to an array and returned.
   */
  getAllPost(topicList) {
    //array to be returned
    let totalCatPost = [];

    topicList.forEach((elem, index) => {
      //concat each listpost array to the totalCatPost array
      //(creates a mega post array with the post from all the list post of the category)
      totalCatPost = totalCatPost.concat(elem.listPosts);
    });

    //this resets the RHS when the category is changed
    if (this.state.currentCategory !== this.props.currentCategory) {
      this.setState({
        post: null,
        currentCategory: this.props.currentCategory,
      });
    }

    return totalCatPost;
  }


    /**
   * @author Matthew Toledo
   * @param {event} e 
   * @description event handler for the click on the post buttons.
   *  When clicked, the id of the target is used to set the post corresponding to the button
   * to state.
   */
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
 * @author Matthew Toledo
 * @class RHS
 * @param {JSON object} buttonPost
 * @description renders the corresponding post information of the post that was clicked in the Middle component
 * Which is passed as the buttonPost props.
 */
class RHS extends React.Component {
  render() {
    let post = this.props.buttonPost;
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
