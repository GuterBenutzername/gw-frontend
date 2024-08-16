import {create} from 'zustand';

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
			name: 'Math',
			assignments: [
				{
					name: 'Homework 1',
					grade: 10,
					weight: 0.2,
				},
				{
					name: 'Homework 2',
					grade: 30,
					weight: 0.2,
				},
				{
					name: 'Homework 3',
					grade: 50,
					weight: 0.2,
				},
				{
					name: 'Homework 4',
					grade: 90,
					weight: 0.2,
				},
			],
		},
		{
			name: 'Science',
			assignments: [
				{
					name: 'Homework 1',
					grade: 10,
					weight: 0.2,
				},
				{
					name: 'Homework 2',
					grade: 30,
					weight: 0.2,
				},
				{
					name: 'Homework 3',
					grade: 50,
					weight: 0.2,
				},
				{
					name: 'Homework 4',
					grade: 90,
					weight: 0.2,
				},
			],
		},
	],
	setCourseState(courses: Course[]) {
		set({courses});
	},
}));
