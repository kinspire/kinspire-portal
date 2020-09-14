import Scaffold from "@app/components/Scaffold";
import StoryPage from "@app/components/Story";
import { Button } from "@material-ui/core";
import React from "react";
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

  // const [course, setCourse] = useState<Course>(null);
  // useEffect(() => {
  //   const getCourse = async () => {
  //     setCourse((await callElectron(ContentArg.GET_COURSE, { courseId })) as Course);
  //   };

  //   // getCourse();
  // }, []);

  // Based on the course/section, use the corresponding lesson view
  // if (get(course, "shortname") === "english") {
  return (
    <div className="courses-container">
      <Scaffold view={View.LESSON}>
        <StoryPage course={course} section={section} module={module} />
        <Button style={{ backgroundColor: getColor(View.COURSES) }}>
          <Link to={`/section/${course}/${section}`}>BACK</Link>
        </Button>
        <Button style={{ backgroundColor: getColor(View.COURSES), float: "right" }}>
          SUBMIT ANSWERS
          <Link to={"/course/" + course}>BACK</Link>
        </Button>
      </Scaffold>
    </div>
  );
  // }

  // return <div>Not here yet!</div>;
}
