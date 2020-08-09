import React from "react";

import { Button, Link, Typography } from "@material-ui/core";
import Selection from "../components/GridSelection";
import Scaffold from "../components/Scaffold";
import { getColor, View } from "../constants";
import { courses } from "../Sample";

import { LinkPair } from "@app/util";
import { useParams } from "react-router-dom";
import "./Curricula.css";

interface Params {
  course: string;
  tier: string;
  module: string;
}

// Creates a grid of all the sub-topics within a topic
export default function Module() {
  // extracts the topic id from the url
  const params = useParams<Params>();
  const course = courses.find((c) => {
    return c.id === params.course;
  });
  const tier = course.tiers.find((t) => {
    return t.id === params.tier;
  });
  const module = tier.modules.find((m) => {
    return m.id === params.module;
  });
  return (
    <Scaffold view={View.COURSE}>
      <div className="curricula-container">
        <Typography variant="h3">{module.title.toUpperCase()}</Typography>

        {/* Provides links to all the sub-topics offered */}
        <Selection
          items={module.lessons.map((l) => {
            return {
              title: l.title,
              link: `/lesson/${course.id}/${tier.id}/${module.id}/${l.id}`,
            } as LinkPair;
          })}
          view={View.COURSES}
        />
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link href="/home">BACK</Link>
        </Button>
      </div>
    </Scaffold>
  );
}
