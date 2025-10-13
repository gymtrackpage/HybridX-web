
import Papa from 'papaparse';

export interface TrainingPlanRow {
  programName: string;
  programDescription: string;
  workoutDay: number;
  workoutTitle: string;
  exerciseName: string;
  exerciseDetails: string;
}

export interface DailyWorkout {
  day: number;
  date: Date;
  workoutTitle: string;
  exercises: Array<{
    name: string;
    details: string;
  }>;
}

/**
 * Parse the training plan CSV file
 */
export async function parseTrainingPlanCSV(csvPath: string): Promise<TrainingPlanRow[]> {
  const response = await fetch(csvPath);
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as TrainingPlanRow[];
        // Convert workoutDay to number
        const processedRows = rows.map(row => ({
          ...row,
          workoutDay: parseInt(row.workoutDay as any, 10)
        }));
        resolve(processedRows);
      },
      error: (error: Error) => {
        reject(error);
      }
    });
  });
}

/**
 * Calculate the start date given the event (race) date
 * Day 84 = race day, so Day 1 = race day - 83 days
 */
export function calculateStartDate(raceDate: Date): Date {
  const startDate = new Date(raceDate);
  startDate.setDate(startDate.getDate() - 83); // 84 days total, so subtract 83
  return startDate;
}

/**
 * Calculate the date for a specific workout day
 */
export function calculateWorkoutDate(raceDate: Date, workoutDay: number): Date {
  const startDate = calculateStartDate(raceDate);
  const workoutDate = new Date(startDate);
  workoutDate.setDate(workoutDate.getDate() + (workoutDay - 1)); // Day 1 is startDate + 0
  return workoutDate;
}

/**
 * Group exercises by workout day and add calculated dates
 */
export function groupWorkoutsByDay(
  rows: TrainingPlanRow[],
  raceDate: Date
): DailyWorkout[] {
  const grouped = new Map<number, DailyWorkout>();

  rows.forEach(row => {
    if (!grouped.has(row.workoutDay)) {
      grouped.set(row.workoutDay, {
        day: row.workoutDay,
        date: calculateWorkoutDate(raceDate, row.workoutDay),
        workoutTitle: row.workoutTitle,
        exercises: []
      });
    }

    const workout = grouped.get(row.workoutDay)!;
    workout.exercises.push({
      name: row.exerciseName,
      details: row.exerciseDetails
    });
  });

  // Convert to array and sort by day
  return Array.from(grouped.values()).sort((a, b) => a.day - b.day);
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format date as YYYY-MM-DD
 */
export function formatDateShort(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format date for ICS file (YYYYMMDD)
 */
export function formatDateForICS(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}


/**
 * Get week number for a given day (1-12 weeks)
 */
export function getWeekNumber(day: number): number {
  return Math.ceil(day / 7);
}
