import React, { Component } from "react";

import "./About.css";

export default class About extends Component {

  render() {
    document.body.style.setProperty("--page-backgound-color", "#fc5e5a");
    return (
      <div className="about-content">
        Hello kids! Welcome to the Portal. Get ready for an adventure.
        <br />
        This Portal is going ot have a lot in store for your educational
        development along with a lot of fun!
        <p>Feature included in this Portal:</p>
        <p>Stories in English</p>
        <p>Stories about the World</p>
        <p>Vocabulary Building Games</p>
        <p>Resume and Cover Letter Help</p>
        <p>Career Tips</p>
        <p>Essay Tips</p>
        <br />
        You will learn many things depending on your class grade. As you
        progress through every task you will move on to a more difficult level.
        This way your mind stays challenged!
        <br />
        The Portal is here to help you grow professionally and personally!
        However, if you ever do get stuck {"don't"} be afraid to ask for help. We
        are all in this together!
      </div>
    );
  }
}
