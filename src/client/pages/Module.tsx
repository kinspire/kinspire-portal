import React from "react";

import Scaffold from "../components/Scaffold";
import Selection from "../components/Selection";
import { View } from "../constants";
import { Typography } from "@material-ui/core";
import { courses } from "../Sample";

import "./Curricula.css";
import { LinkPair } from "@app/util";
import { useParams } from "react-router-dom";

interface Params {
  course: string;
  tier: string;
  module: string;
}

export default function Module() {
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
    <Scaffold view={View.MATERIALS}>
      <div className="curricula-container">
        <Typography
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "normal",
            fontSize: "65px",
            paddingBottom: "3%",
          }}
        >
          {module.title}
        </Typography>
        <Selection
          items={module.lessons.map((l) => {
            return {
              title: l.title,
              link: `/lesson/${course.id}/${tier.id}/${module.id}/${l.id}`,
            } as LinkPair;
          })}
          view={View.MATERIALS}
        />
      </div>
    </Scaffold>
  );
}
