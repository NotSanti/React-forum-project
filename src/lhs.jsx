"use strict";

const button = <button>click me </button>;
const container = document.querySelector("#LHS");

class LHS extends React.Component {
  constructor(data) {
    super();
    this.data = data;
  }

  render() {
    return button;
  }
}

//ReactDOM.render(<LHS />, container);
