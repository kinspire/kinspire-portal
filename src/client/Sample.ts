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
const level2Module: Module = {
    title: "Level 2",
    id: "level2",
    lessons: [breakfastLesson],
};
const storiesTier: Tier = {
    title: "Stories",
    id: "stories",
    modules: [level1Module, level2Module],
}
const english: Course = {
    title: "English",
    id: "english",
    tiers: [storiesTier],
}

// sample health course
const hygeine1: Lesson = {
    title: "Body Hygiene Introduction",
    id: "lesson1-1",
    content: "blah",
};
const hygiene2: Lesson = {
    title: "Healthy Hair",
    id: "lesson1-2",
    content: "blah",
};
const hygeine3: Lesson = {
    title: "Excellent Eyes",
    id: "lesson1-3",
    content: "blah",
};
const hygeine4: Lesson = {
    title: "Exceptional Ears",
    id: "lesson1-4",
    content: "blah",
};
const hygeine5: Lesson = {
    title: "Nice Nose",
    id: "lesson1-5",
    content: "blah",
};
const hygeine6: Lesson = {
    title: "Magical Mouth",
    id: "lesson1-6",
    content: "blah",
};
const hygeine7: Lesson = {
    title: "Happy Hands",
    id: "lesson1-7",
    content: "blah",
};
const hygeine8: Lesson = {
    title: "Neat Nails",
    id: "lesson1-8",
    content: "blah",
};
const hygeine9: Lesson = {
    title: "Fabulous Feet",
    id: "lesson1-9",
    content: "blah",
};
const hygeine10: Lesson = {
    title: "Cleaning your body!",
    id: "lesson1-10",
    content: "blah",
};
const hygeine11: Lesson = {
    title: "Recap",
    id: "lesson1-11",
    content: "blah",
};

const module1: Module = {
    title: "Module 1: Body Hygiene",
    id: "level1",
    lessons: [hygeine1, hygiene2, hygeine3, hygeine4, hygeine5, hygeine6, hygeine7, hygeine8, hygeine9, hygeine9, hygeine10, hygeine11],
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