import { create } from "zustand";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type Course = {
  name: string;
  assignments: Assignment[];
};

export type Assignment = {
  name: string;
  grade: number;
  weight: number;
  id: string;
};

export const useGWState = create<{
  courses: Course[];
  setCourseState: (courses: Course[]) => void;
}>((set) => {
  const generateCourse = (): Course => ({
    name: capitalizeFirstLetter(faker.word.noun()),
    assignments: Array.from({ length: faker.number.int({ min: 1, max: 10 }) })
      .fill({})
      .map(() => ({
        name: capitalizeFirstLetter(faker.word.words(2)),
        grade: faker.number.int({ min: 0, max: 100 }),
        weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        id: uuidv4(),
      })),
  });

  return {
    courses: Array.from({ length: faker.number.int({ min: 1, max: 5 }) })
      .fill({})
      .map(() => generateCourse()),
    setCourseState(courses: Course[]) {
      set({ courses });
    },
  };
});
