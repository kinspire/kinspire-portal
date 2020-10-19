import Scaffold from "@app/components/Scaffold";
import StoryPage from "@app/components/Story";
import { callElectronContent } from "@app/services/electron";
import { ContentArg } from "@common/messages";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getColor, View } from "../constants";

interface Params {
  course: string;
  section: string;
  module: string;
}

export default function Module() {
  // extracts the topic id from the url
  const { course, section, module } = useParams<Params>();

  // State is owned by us so we can submit it
  const [answers, setAnswers] = useState(null);

  // const [course, setCourse] = useState<Course>(null);
  // useEffect(() => {
  //   const getCourse = async () => {
  //     setCourse((await callElectronContent(ContentArg.GET_COURSE, { courseId })) as Course);
  //   };

  //   // getCourse();
  // }, []);

  // Save to backend
  const saveContent = () => {
    callElectronContent(ContentArg.SUBMIT_MODULE, { course, section, module, answers });
  };

  // Based on the course/tier, use the corresponding lesson view
  // TODO what's the tier check?
  // let template = <div></div>;
  // if (section === "stories") {
  //   template = <StoryPage course={course} section={section} module={module} />;
  // } else if (section === "homework") {
  //   template = <QuizPage course={course} section={section} module={module} />;
  // }

  return (
    <div className="courses-container">
      <Scaffold view={View.LESSON}>
        <StoryPage
          course={course}
          section={section}
          module={module}
          answers={answers}
          setAnswers={setAnswers}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ backgroundColor: getColor(View.COURSES) }}>
            <Link to={`/section/${course}/${section}`}>BACK</Link>
          </Button>
          <Button style={{ backgroundColor: getColor(View.COURSES) }} onClick={saveContent}>
            SAVE
          </Button>
          <Button
            style={{
              backgroundColor: getColor(View.COURSES),
            }}
          >
            <Link to={"/submit/" + course + "/" + section + "/" + module}>SUBMIT ALL ANSWERS</Link>
          </Button>
        </div>
      </Scaffold>
    </div>
  );
  // }

  // return <div>Not here yet!</div>;
}
