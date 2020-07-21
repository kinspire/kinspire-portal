import { CircularProgress, Typography } from "@material-ui/core";
import _ from "lodash";
import log from "loglevel";
import React, { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { service } from "../services/content";
import { LinkPair } from "../util";
import { ContentType } from "@common/schema";

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

export default function WordSearches() {
  const [wordSearches, setWordSearches] = useState({} as Record<number, LinkPair[]>);

  useEffect(() => {
    const fetchItems = async () => {
      // Sort stories by class level and number
      const wordSearchList = (await service.getAllContent(ContentType.WORD_SEARCH)).sort((a, b) =>
        a.classLevel !== b.classLevel ? a.classLevel - b.classLevel : a.num - b.num
      );

      let curr = 0;
      const newWSList = {} as Record<number, LinkPair[]>;
      wordSearchList.forEach((wordSearch) => {
        if (wordSearch.classLevel !== curr) {
          newWSList[wordSearch.classLevel] = [];
          curr = wordSearch.classLevel;
        }
        newWSList[curr].push({
          name: _.get(wordSearch, "title"),
          link: `/wordsearch/${_.get(wordSearch, "classLevel")}/${_.get(wordSearch, "num")}`,
          subtitle: `${_.get(wordSearch, "classLevel")}-${_.get(wordSearch, "num")}`,
        });
      });

      setWordSearches(newWSList);
    };

    fetchItems();
  }, []);

  const view = View.WORD_SEARCH;

  return (
    <Scaffold view={view}>
      {_.size(wordSearches) ? (
        _.map(wordSearches, (list, classLevel) => (
          <React.Fragment key={classLevel}>
            <Typography style={{ textAlign: "center" }}>Level {classLevel}</Typography>
            <Selection view={view} items={list} colNum={4} />
          </React.Fragment>
        ))
      ) : (
        <CircularProgress className="loading" />
      )}
    </Scaffold>
  );
}
