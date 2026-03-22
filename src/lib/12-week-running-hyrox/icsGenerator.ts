import FileSaver from "file-saver";
import { trainingPlan } from "./data";

export const generateICS = async (startDate: Date | null, raceDate: Date | null) => {
  let planStartDate: Date;

  if (raceDate) {
    // Back calculate from Race Date
    // Assuming Race Date is the Sunday of Week 12
    // We need to find the Monday of Week 1
    // 12 weeks = 84 days. If race is day 84 (Sun), start is day 1 (Mon).
    // So subtract 11 weeks and 6 days? 
    // Let's approximate: Week 12 starts 11 weeks after Week 1.
    const raceDayTime = raceDate.getTime();
    // 11 weeks * 7 days * 24 hours * ...
    const weeksInMillis = 11 * 7 * 24 * 60 * 60 * 1000;
    // We assume the race is on the Sunday of week 12.
    // So the Monday of Week 12 is RaceDate - 6 days.
    // The Monday of Week 1 is (RaceDate - 6 days) - 11 weeks.
    const sixDays = 6 * 24 * 60 * 60 * 1000;
    planStartDate = new Date(raceDayTime - sixDays - weeksInMillis);
  } else if (startDate) {
    planStartDate = startDate;
  } else {
    return; // Should not happen
  }

  // Ensure start date is set to midnight for clean calcs
  planStartDate.setHours(0, 0, 0, 0);

  let icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HybridX//RunPlan//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  // Helper to format date for ICS (YYYYMMDD)
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('T')[0];
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Iterate over the plan
  trainingPlan.forEach(week => {
    const weekStart = addDays(planStartDate, (week.weekNumber - 1) * 7);

    week.days.forEach(dayPlan => {
      let dayOffset = 0;
      
      // Determine day offset based on the "Day X" string
      // Default Pattern: Day 1=Mon(0), Day 2=Tue(1), Day 3=Thu(3), Day 4=Sat(5)
      // Week 12 is special.
      
      const lowerDay = dayPlan.day.toLowerCase();

      if (week.weekNumber === 12) {
         if (lowerDay.includes("monday")) dayOffset = 0;
         else if (lowerDay.includes("tuesday")) dayOffset = 1;
         else if (lowerDay.includes("wednesday")) dayOffset = 2;
         else if (lowerDay.includes("thursday")) dayOffset = 3;
         else if (lowerDay.includes("friday")) dayOffset = 4;
         else if (lowerDay.includes("saturday") || lowerDay.includes("sunday") || lowerDay.includes("race day")) dayOffset = 6;
      } else {
        if (lowerDay.includes("day 1")) dayOffset = 0; // Monday
        else if (lowerDay.includes("day 2")) dayOffset = 1; // Tuesday
        else if (lowerDay.includes("day 3")) dayOffset = 3; // Thursday (Rest Wed)
        else if (lowerDay.includes("day 4")) dayOffset = 5; // Saturday (Rest Fri)
      }

      const workoutDate = addDays(weekStart, dayOffset);
      const dateStr = formatDate(workoutDate);

      // Construct Description
      let description = `Focus: ${dayPlan.focus}\\n\\n`;
      
      if (dayPlan.warmup && dayPlan.warmup.length > 0) {
        description += `WARM UP:\\n${dayPlan.warmup.join('\\n')}\\n\\n`;
      }
      if (dayPlan.mainWorkout && dayPlan.mainWorkout.length > 0) {
        description += `MAIN WORKOUT:\\n${dayPlan.mainWorkout.join('\\n')}\\n\\n`;
      }
      if (dayPlan.coachHint) {
        description += `COACH'S HINT:\\n${dayPlan.coachHint}`;
      }

      // Escape special characters for ICS
      description = description.replace(/,/g, '\\,').replace(/;/g, '\\;');

      icsContent += 
`BEGIN:VEVENT
DTSTART;VALUE=DATE:${dateStr}
SUMMARY:W${week.weekNumber}: ${dayPlan.title}
DESCRIPTION:${description}
UID:${dateStr}-W${week.weekNumber}-D${dayOffset}@hybridx.club
END:VEVENT
`;
    });
  });

  icsContent += "END:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  // Robustly handle file-saver
  const saveAs = (FileSaver as any).saveAs || FileSaver;
  saveAs(blob, "HybridX_Training_Plan.ics");
};