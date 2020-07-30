import { CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";
import log from "loglevel";
import React from "react";
// import React, { useEffect, useState } from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { service } from "../services/content";
import { LinkPair } from "../util";

import "./Stories.css";

/*
export default function Stories() {
  // const [stories, setStories] = useState([] as LinkPair[]);

  useEffect(() => {
    const fetchItems = async () => {
      const s = await getSelectionItems(V.STORIES);
      setStories(s);
    };

    fetchItems();
  });

  return (
    <Container view={V.STORIES}>
      <Selection items={[]} />
    </Container>
  );
}
*/

// Using classes
interface State {
  stories: Record<number, LinkPair[]>;
}

export default class Stories extends React.Component<{}, State> {
  public state = {
    stories: {},
  } as State;

  public async componentDidMount() {
    // Sort stories by class level and number
    const storyList = (await service.getStories()).sort((a, b) =>
      a.classLevel !== b.classLevel ? a.classLevel - b.classLevel : a.num - b.num
    );

    let curr = 0;
    const stories = {} as Record<number, LinkPair[]>;
    storyList.forEach((story) => {
      if (story.classLevel !== curr) {
        stories[story.classLevel] = [];
        curr = story.classLevel;
      }
      stories[curr].push({
        name: _.get(story, "title"),
        link: `/story/${_.get(story, "classLevel")}/${_.get(story, "num")}`,
        subtitle: `${_.get(story, "classLevel")}-${_.get(story, "num")}`,
      });
    });

    this.setState({
      stories,
    });
  }

  public render() {
    return (
      <Scaffold view={View.STORIES}>
        <div className="stories-container">
          <Typography style={{ textAlign: "center", color: "#A9BB59", fontWeight: "bold", fontSize: "60px" }}>
            STORIES
          </Typography>
          {_.size(this.state.stories) ? (
            _.map(this.state.stories, (list, classLevel) => (
              <React.Fragment key={classLevel}>
                <Typography className="stories-level">Level {classLevel}</Typography>
                <Selection view={View.MATERIALS} items={list} colNum={4} />
              </React.Fragment>
            ))
          ) : (
            <CircularProgress className="loading" />
          )}
        </div>
      </Scaffold>
    );
  }
}