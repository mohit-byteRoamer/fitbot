import { workout_plans } from "../assets/workout_plans_data.js";

export const formatWorkoutMessage = (month, day) => {
  const workout = workout_plans[month].workouts.find((w) => w.day === day);
  if (!workout) return "No workout found for today.";

  let message = `*Workout Plan for Month ${month} - ${workout_plans[month].goal}:*\n\n`;
  workout.exercises.forEach((ex) => {
    message += `• ${ex.name}: ${ex.sets} sets of ${ex.reps} (Rest: ${ex.rest})\n`;
  });
  return message;
};

// Validation functions
export function isValidMonth(month) {
  return month >= 1 && month <= Object.keys(workout_plans).length; // Adjust if necessary
}

export function isValidDay(day) {
  const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  return validDays.includes(day);
}
