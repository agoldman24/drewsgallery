import { Component, Fragment } from "react";
import "./index.css";

class App extends Component {
  render() {
    return (
      <Fragment>
        <div id="stars0"></div>
        <div id="stars1"></div>
        <div id="stars2"></div>
        <section>
          <span className="shootingStar"></span>
          <span className="shootingStar"></span>
          <span className="shootingStar"></span>
          <span className="shootingStar"></span>
        </section>
        <img
          src="https://github.com/spite/CSS3DClouds/blob/master/smoke.png?raw=true"
          style={{ opacity: 0.2, width: "300%" }}
          className="cloud"
        />
      </Fragment>
    );
  }
}

export default App;
