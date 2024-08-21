import { Assignment } from "../state-hook";

export default function calculateAverage(assignments: Assignment[]) {
  let weights = assignments.map((assignment: Assignment) => assignment.weight);
  const uniqueWeights = [...new Set(weights)];
  let averages = [];
  for (let i = 0; i < uniqueWeights.length; i++) {
    const weight = uniqueWeights[i];
    let sum = 0;
    let count = 0;
    for (let j = 0; j < assignments.length; j++) {
      if (assignments[j].weight === weight) {
        sum += assignments[j].grade;
        count++;
      }
    }
    averages.push({ avg: sum / count, weight: weight });
  }
  let finalAverages = [];
  let totalWeight = 0;
  for (let i = 0; i < averages.length; i++) {
    totalWeight += averages[i].weight;
  }
  if (totalWeight !== 100) {
    for (let i = 0; i < averages.length; i++) {
      averages[i].weight = (averages[i].weight * (100 / totalWeight)) / 100;
    }
  }
  for (let i = 0; i < averages.length; i++) {
    finalAverages.push(averages[i].avg * averages[i].weight);
  }
  return finalAverages.reduce((a, b) => a + b, 0);
}
