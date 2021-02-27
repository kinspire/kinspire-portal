import Scaffold from "../components/Scaffold";
import StoryPage from "../components/Story";
import { callElectronContent } from "../services/electron";
import { ContentArg } from "@common/messages";
import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-native";
import { getColor, PageView } from "../constants";

interface Params {
  course: string;
  section: string;
  module: string;
}

export default function Module() {
  // extracts the topic id from the url
  const { course, section, module } = useParams<Params>();
  const history = useHistory();

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
    callElectronContent(ContentArg.SAVE_MODULE, { course, section, module, answers });
  };

  const submitContent = async () => {
    if (
      await callElectronContent(ContentArg.SAVE_MODULE, {
        course,
        section,
        module,
        answers,
        submit: true,
      })
    ) {
      history.push("/submit/" + course + "/" + section + "/" + module);
    } else {
      alert("Unable to submit! :(");
    }
  };

  // Based on the course/tier, use the corresponding lesson view
  // TODO what's the tier check?
  // let template = <View></View>;
  // if (section === "stories") {
  //   template = <StoryPage course={course} section={section} module={module} />;
  // } else if (section === "homework") {
  //   template = <QuizPage course={course} section={section} module={module} />;
  // }

  return (
    <View className="courses-container">
      <Scaffold view={PageView.LESSON}>
        <StoryPage
          course={course}
          section={section}
          module={module}
          answers={answers}
          setAnswers={setAnswers}
        />
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Button style={{ backgroundColor: getColor(PageView.COURSES) }}>
            <Link to={`/section/${course}/${section}`}>BACK</Link>
          </Button>
          <Button style={{ backgroundColor: getColor(PageView.COURSES) }} onClick={saveContent}>
            SAVE
          </Button>
          <Button style={{ backgroundColor: getColor(PageView.COURSES) }} onClick={submitContent}>
            SUBMIT ALL ANSWERS
          </Button>
        </View>
      </Scaffold>
    </View>
  );
  // }

  // return <View>Not here yet!</View>;
}
