export function getAssignmentData(document: Document, courseIndex: number) {
  const assignments = [];
  const course = document.querySelectorAll("tbody")[courseIndex * 2 + 4];
  const rows = [...course.children].slice(1, -1);
  for (const row of rows) {
    const name = row.children[2].textContent;
    const weight_string = row.children[3].textContent;
    let weight = 0;
    switch (weight_string) {
      case "Daily": {
        weight = 0.15;
        break;
      }
      case "Quiz": {
        weight = 0.25;
        break;
      }
      case "Major": {
        weight = 0.6;
        break;
      }
      default: {
        break;
      }
    }
    let grade = 0;
    if (
      row.children[4].textContent !== "Z" &&
      row.children[4].textContent !== "-"
    ) {
      grade = Number.parseFloat(row.children[4].textContent ?? "0");
    }
    let weight_complex;
    if (row.children[5].textContent !== "1.00") {
      weight_complex = Number.parseFloat(row.children[5].textContent ?? "0");
    }
    assignments.push({ name, weight, grade, weight_complex });
  }
  let courseName = "";
  let courseElement = course.parentElement;
  for (let index = 0; index < 4; index++) {
    if (courseElement === null) {
      break;
    }
    courseElement = courseElement.parentElement;
  }
  if (courseElement !== null) {
    courseName = courseElement.children[0].textContent ?? "";
  }
  return { name: courseName, assignments };
}

export function getAllCourseData(document: Document) {
  const courses = [];
  while (document.querySelectorAll("tbody").length > 4 + courses.length * 2) {
    courses.push(getAssignmentData(document, courses.length));
  }
  return courses;
}
