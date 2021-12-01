"use strict";

let global;


function setup() {
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
      click: false,
      currentCategory: null
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
        click: true,
        currentCategory: (e.target.id - 1)
      })
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
        {this.state.click ? <Middle currentCategory={this.state.currentCategory}  /> : null}
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

  // getData() {
  //   let topicList = global.categories[0].topicList;
  //   console.log(topicList);
  //   this.setState({ topics: topicList });
  // }

  getAllPost(topicList) {
    //array to be returned
    let totalCatPost = [];
    
    topicList.forEach( (elem, index) => {
      console.log("elem" + elem.listPosts);
      //concat each listpost array to the totalCatPost array 
      //(creates a mega post array with the post from all the list post of the category)
      totalCatPost = totalCatPost.concat(elem.listPosts)
      })
    
    console.log(totalCatPost);
    return totalCatPost;
  }

  render() {
    console.log("render middle");
    let topicList = global.categories[this.props.currentCategory].topicList;
    let totalCatPost = this.getAllPost(topicList);
    return (
      <div>
        {totalCatPost.map( (post, index) => (
          <p key={index}>{post.text}</p>
        ))}
      </div>
    );
  }
}

setup();
