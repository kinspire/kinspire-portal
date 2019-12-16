import { CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";
import React from "react";
// import React, { useEffect, useState } from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { service } from "../services/content";
import { LinkPair } from "../util";

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
    storyList.forEach(story => {
      if (story.classLevel !== curr) {
        stories[story.classLevel] = [];
        curr = story.classLevel;
      }
      stories[curr].push({
        name: _.get(story, "title"),
        link: `/activities/story/${_.get(story, "classLevel")}/${_.get(story, "num")}`,
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
        {_.size(this.state.stories) ? (
          _.map(this.state.stories, (list, classLevel) => (
            <React.Fragment key={classLevel}>
              <Typography style={{ textAlign: "center" }}>Level {classLevel}</Typography>
              <Selection view={View.STORIES} items={list} />
            </React.Fragment>
          ))
        ) : (
          <CircularProgress className="loading" />
        )}
      </Scaffold>
    );
  }
}
