import { create } from "zustand";
import { faker } from "@faker-js/faker";
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
};

export const useGWState = create<{
  courses: Course[];
  setCourseState: (courses: Course[]) => void;
}>((set) => ({
  courses: [
    {
      name: "Math",
      assignments: [
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
      ],
    },
    {
      name: "Science",
      assignments: [
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
        {
          name: capitalizeFirstLetter(faker.company.buzzPhrase()),
          grade: faker.number.int({ min: 0, max: 100 }),
          weight: faker.number.float({ min: 0, max: 1, precision: 0.01 }),
        },
      ],
    },
  ],
  setCourseState(courses: Course[]) {
    set({ courses });
  },
}));
