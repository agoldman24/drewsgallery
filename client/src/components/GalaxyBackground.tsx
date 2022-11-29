import { Fragment } from "react";
import "../index.css";

export default function GalaxyBackground() {
  return (
    <Fragment>
      <div id="stars0" />
      <div id="stars1" />
      <div id="stars2" />
      <section>
        <span className="shootingStar" />
        <span className="shootingStar" />
        <span className="shootingStar" />
        <span className="shootingStar" />
      </section>
      <img
        src="https://github.com/spite/CSS3DClouds/blob/master/smoke.png?raw=true"
        style={{ opacity: 0.2, width: "300%" }}
        className="cloud"
      />
    </Fragment>
  );
}
