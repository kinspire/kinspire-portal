import { FlatList, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Course } from "../schema";
import { Link } from "react-router-native";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/ui/actions";
import { Moodle } from "../services/moodle";
import { setCourses } from "../store/content/actions";
import { useSelector } from "../store";

export default function Courses() {
  const courses = useSelector((state) => state.contentState.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCourses = async () => {
      dispatch(setLoading(true));
      dispatch(setCourses((await Moodle.getCourses()) as Course[]));
      dispatch(setLoading(false));
    };

    getCourses();
  }, []);

  return (
    <View>
      <Text>Courses</Text>
      <FlatList
        data={courses}
        renderItem={({ item: c }) => (
          <Link to={`/course/${c.id}`}>
            <Text>{c.title}</Text>
          </Link>
        )}
        keyExtractor={(c) => c.id}
      />
    </View>
  );
}
