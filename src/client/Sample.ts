// Describes a sample course

import { Course, Lesson, Module, Tier } from "./util";

// sample english course
const breakfastLesson: Lesson = {
    title: "Gopi eats breakfast!",
    id: "story1-1",
    content: "Gopi gopi gopy",
};
const level1Module: Module = {
    title: "Level 1",
    id: "level1",
    lessons: [breakfastLesson],
};
const storiesTier: Tier = {
    title: "Stories",
    id: "stories",
    modules: [level1Module],
}
const english: Course = {
    title: "English",
    id: "english",
    tiers: [storiesTier],
}

// sample health course
const lesson1: Lesson = {
    title: "Body Hygiene Introduction",
    id: "lesson1-1",
    content: "blah",
};
const lesson2: Lesson = {
    title: "Healthy Hair",
    id: "lesson1-2",
    content: "blah",
};
const lesson3: Lesson = {
    title: "Excellent Eyes",
    id: "lesson1-3",
    content: "blah",
};
const lesson4: Lesson = {
    title: "Exceptional Ears",
    id: "lesson1-4",
    content: "blah",
};
const lesson5: Lesson = {
    title: "Nice Nose",
    id: "lesson1-5",
    content: "blah",
};
const module1: Module = {
    title: "Module 1: Body Hygiene",
    id: "level1",
    lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
};
const module2: Module = {
    title: "Module 2: Body Conditions",
    id: "level2",
    lessons: [],
};
const preventingIllness: Tier = {
    title: "Preventing Illness",
    id: "level1",
    modules: [module1, module2],
};
const fuelingYourBody: Tier = {
    title: "Fueling your Body", 
    id: "tiers", 
    modules: [],
}
const health: Course = {
    title: "Health",
    id: "health",
    tiers: [preventingIllness, fuelingYourBody],
}

export const courses = [
    english, health
]

// sample leadership course