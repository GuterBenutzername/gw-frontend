export function getAssignmentData(document: Document, courseIndex: number) {
  const assignments = [];
  const course = document.getElementsByTagName("tbody")[courseIndex * 2 + 4];
  const rows = Array.from(course.children).slice(1, -1);
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const name = row.children[2].textContent;
    const weight_string = row.children[3].textContent;
    let weight = 0;
    switch (weight_string) {
      case "Daily":
        weight = 0.15;
        break;
      case "Quiz":
        weight = 0.25;
        break;
      case "Major":
        weight = 0.6;
        break;
      default:
        weight = 0;
        break;
    }
    let grade = 0;
    if (
      !(row.children[4].textContent === "Z") &&
      !(row.children[4].textContent === "-")
    ) {
      grade = parseFloat(row.children[4].textContent ?? "0");
    }
    assignments.push({ name, weight, grade });
  }
  let courseName = "";
  let courseElement = course.parentElement;
  for (let i = 0; i < 4; i++) {
    if (courseElement === null) {
      courseName = "";
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
  while (
    document.getElementsByTagName("tbody").length >
    4 + courses.length * 2
  ) {
    courses.push(getAssignmentData(document, courses.length));
  }
  return courses;
}
