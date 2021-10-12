import { find, get } from "lodash";
import React, { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-native";
import { Section } from "../schema";
import { Moodle } from "../services/moodle";
import { useSelector } from "../store";
import { setSections } from "../store/content/actions";

export default function CoursePage() {
  const courses = useSelector((state) => state.contentState.courses);
  const allSections = useSelector((state) => state.contentState.sections);

  const dispatch = useDispatch();

  const { courseId } = useParams<{ courseId: string }>();

  useEffect(() => {
    const getSections = async () => {
      dispatch(setSections(courseId, (await Moodle.getSections(courseId)) as Section[]));
    };

    getSections();
  }, []);

  const course = find(courses, (c) => c.id === courseId);
  const sections = get(allSections, courseId, []);

  return (
    <View>
      <Text>Course: {get(course, "title")}</Text>
      <FlatList
        data={sections}
        renderItem={({ item: s }) => (
          <Link to={`/section/${courseId}/${s.id}`}>
            <Text>&gt; {s.title}</Text>
          </Link>
        )}
        keyExtractor={(s) => s.id}
      />
    </View>
  );
}
