import Scaffold from "@app/components/Scaffold";
import StoryPage from "@app/components/Story";
import { callElectron } from "@app/services/content";
import { ContentArg } from "@common/messages";
import { Course } from "@common/schema";
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getColor, View } from "../constants";

interface Params {
  course: string;
  tier: string;
  module: string;
  lesson: string;
}

export default function Lesson() {
  // extracts the topic id from the url
  const { course: courseId, tier, module, lesson } = useParams<Params>();

  const [course, setCourse] = useState<Course>(null);
  useEffect(() => {
    const getCourse = async () => {
      setCourse((await callElectron(ContentArg.GET_COURSE, { courseId })) as Course);
    };

    // getCourse();
  }, []);

  // Based on the course/tier, use the corresponding lesson view
  // TODO what's the tier check?
  // if (get(course, "shortname") === "english") {
  return (
    <div className="courses-container">
      <Scaffold view={View.LESSON}>
        <StoryPage course={courseId} tier={tier} module={module} lesson={lesson} />
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to="/stories">BACK</Link>
        </Button>
        <Button style={{ backgroundColor: getColor(View.COURSES), float: "right" }}>
          SUBMIT ANSWERS
        </Button>
      </Scaffold>
    </div>
  );
  // }

  // return <div>Not here yet!</div>;
}
