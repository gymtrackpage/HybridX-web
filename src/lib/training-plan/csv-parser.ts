import Papa from 'papaparse';
import { subDays, format } from 'date-fns';
import fs from 'fs';
import path from 'path';

export interface WorkoutExercise {
  exerciseName: string;
  exerciseDetails: string;
}

export interface WorkoutDay {
  day: number;
  date: string; // ISO format date
  workoutTitle: string;
  exercises: WorkoutExercise[];
}

export interface TrainingPlan {
  programName: string;
  programDescription: string;
  workouts: WorkoutDay[];
  eventName: string;
  eventDate: string;
  userEmail: string;
}

interface CSVRow {
  programName: string;
  programDescription: string;
  workoutDay: string;
  workoutTitle: string;
  exerciseName: string;
  exerciseDetails: string;
}

export async function parseTrainingPlanCSV(
  eventDate: string,
  eventName: string,
  userEmail: string
): Promise<TrainingPlan> {
  // Read the CSV file from the public directory
  const csvPath = path.join(process.cwd(), 'public', 'training-plans', 'hyrox-fusion-84.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');

  // Parse CSV
  const parseResult = Papa.parse<CSVRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = parseResult.data;

  if (rows.length === 0) {
    throw new Error('CSV file is empty or invalid');
  }

  const programName = rows[0].programName;
  const programDescription = rows[0].programDescription;

  // Group exercises by workout day
  const workoutsByDay = new Map<number, { workoutTitle: string; exercises: WorkoutExercise[] }>();

  rows.forEach((row) => {
    const day = parseInt(row.workoutDay);
    if (isNaN(day)) return;

    if (!workoutsByDay.has(day)) {
      workoutsByDay.set(day, {
        workoutTitle: row.workoutTitle,
        exercises: [],
      });
    }

    workoutsByDay.get(day)!.exercises.push({
      exerciseName: row.exerciseName,
      exerciseDetails: row.exerciseDetails,
    });
  });

  // Calculate dates for each workout day
  // Day 84 = event date, so we count backwards
  const eventDateObj = new Date(eventDate);
  const workouts: WorkoutDay[] = [];

  workoutsByDay.forEach((workout, day) => {
    const daysBeforeEvent = 84 - day;
    const workoutDate = subDays(eventDateObj, daysBeforeEvent);

    workouts.push({
      day,
      date: format(workoutDate, 'yyyy-MM-dd'),
      workoutTitle: workout.workoutTitle,
      exercises: workout.exercises,
    });
  });

  // Sort by day
  workouts.sort((a, b) => a.day - b.day);

  return {
    programName,
    programDescription,
    workouts,
    eventName,
    eventDate,
    userEmail,
  };
}
