import { Assignment } from "../state-hook";

export default function calculateAverage(assignments: Assignment[]) {
  const weights = assignments.map(
    (assignment: Assignment) => assignment.weight,
  );
  const uniqueWeights = [...new Set(weights)];
  const averages = [];
  for (const weight of uniqueWeights) {
    let sum = 0;
    let count = 0;
    for (const assignment of assignments) {
      if (assignment.weight === weight) {
        sum += assignment.grade;
        count++;
      }
    }
    averages.push({ avg: sum / count, weight: weight });
  }
  const finalAverages = [];
  let totalWeight = 0;
  for (const average of averages) {
    totalWeight += average.weight;
  }
  if (totalWeight !== 100) {
    for (const average of averages) {
      average.weight = (average.weight * (100 / totalWeight)) / 100;
    }
  }
  for (const average of averages) {
    finalAverages.push(average.avg * average.weight);
  }
  return finalAverages.reduce((a, b) => a + b, 0);
}
