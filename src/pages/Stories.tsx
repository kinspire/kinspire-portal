import React from "react";
// import React, { useEffect, useState } from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { service } from "../content";
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
  stories: LinkPair[];
}

export default class Stories extends React.Component<{}, State> {
  public state = {
    stories: [],
  } as State;

  public async componentDidMount() {
    this.setState({
      stories: await service.getStories(),
    });
  }

  public render() {
    return (
      <Scaffold view={View.STORIES}>
        <Selection items={this.state.stories} />
      </Scaffold>
    );
  }
}
