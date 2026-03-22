export interface WorkoutSection {
  title: string;
  items: string[];
}

export interface DayPlan {
  day: string;
  title: string;
  focus: string;
  warmup: string[];
  mainWorkout: string[];
  coolDown: string[];
  coachHint: string;
  activity?: string[]; // For rest days or alternative activities
}

export interface WeekPlan {
  weekNumber: number;
  title: string;
  phase: string;
  phaseDescription?: string;
  context?: string; // Weekly context or theme notes
  days: DayPlan[];
}
