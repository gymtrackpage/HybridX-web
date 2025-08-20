
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { google } = require("googleapis");
const { subWeeks, setDay } = require("date-fns");
const logger = require("firebase-functions/logger");

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

// Config is loaded from environment variables
const SPREADSHEET_ID = process.env.SHEETS_ID;
const API_KEY = process.env.SHEETS_KEY;
const PLAN_SHEET_ID = process.env.PLAN_SHEET_ID;
const SHEET_NAME = "Sheet1";
const TEMPLATE_SHEET_NAME = "template";

exports.syncEventsFromGoogleSheet = functions.pubsub
  .schedule("every 12 hours")
  .onRun(async (context) => {
    logger.info("Starting Hyrox event sync from Google Sheet.");

    if (!SPREADSHEET_ID || !API_KEY) {
      logger.error("Spreadsheet ID or API Key is not configured in environment variables.");
      throw new functions.https.HttpsError("failed-precondition", "Missing SPREADSHEET_ID or SHEETS_KEY configuration.");
    }

    try {
      const sheets = google.sheets({ version: "v4", auth: API_KEY });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:B`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) { // Check for header row
        logger.warn("No data found in the Google Sheet.");
        return;
      }
      
      rows.shift(); // Remove header row
      logger.info(`Found ${rows.length} event rows in the sheet.`);

      const newEvents = rows
        .map((row) => {
            const [name, dateString] = row;
            if (!name || !dateString) return null;
            
            const date = new Date(dateString);
            if (!isNaN(date.getTime()) && date > new Date()) {
                return { name, date: Timestamp.fromDate(date) };
            }
            return null;
        })
        .filter(event => event !== null);

      const eventsCollection = db.collection("hyroxEvents");
      const batch = db.batch();
      
      const snapshot = await eventsCollection.get();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      logger.info(`Deleting ${snapshot.size} old events.`);

      newEvents.forEach((event) => {
        const docRef = eventsCollection.doc();
        batch.set(docRef, event);
      });
      logger.info(`Adding ${newEvents.length} new events.`);

      await batch.commit();
      logger.info("Successfully synchronized Hyrox events to Firestore.");
      
    } catch (error) {
      logger.error("Error syncing events from Google Sheet:", error);
      if (error.code === 403) {
          logger.error("Permission denied. Ensure the Google Sheets API is enabled and the API key has access.");
      }
      throw new functions.https.HttpsError("internal", "Failed to sync events.");
    }
  });

exports.generateTrainingPlan = functions.firestore
  .document("trainingPlanSignups/{signupId}")
  .onCreate(async (snap, context) => {
    const signupData = snap.data();
    const { signupId } = context.params;

    logger.info(`New signup detected (ID: ${signupId}), generating plan for: ${signupData.email}`);

    if (!signupData.email || !signupData.event || signupData.status !== 'pending') {
      logger.warn(`Signup ${signupId} is missing data or is not pending.`);
      return null;
    }

    if (!API_KEY || !PLAN_SHEET_ID) {
      logger.error("Missing environment variables: SHEETS_KEY or PLAN_SHEET_ID");
      await snap.ref.update({ status: 'error', errorMessage: 'Server configuration error.' });
      return null;
    }

    try {
      const [eventName, eventDateStr] = signupData.event.split(' | ');
      const eventDate = new Date(eventDateStr);
      if (isNaN(eventDate.getTime())) {
        throw new Error(`Invalid event date format for signup ${signupId}`);
      }

      const sheets = google.sheets({ version: "v4", auth: API_KEY });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: PLAN_SHEET_ID,
        range: `${TEMPLATE_SHEET_NAME}!A:E`,
      });

      const rows = response.data.values;
      if (!rows || rows.length <= 1) {
        throw new Error("Training plan template sheet is empty or has no workouts.");
      }

      const headers = rows.shift();
      logger.info(`Found ${rows.length} workouts in the template.`);

      const personalizedPlan = rows.map(row => {
        const [week, day, focus, workoutDetails, notes] = row;
        const weekNum = parseInt(week, 10);
        const dayNum = parseInt(day, 10);

        if (isNaN(weekNum) || isNaN(dayNum)) return null;

        const weeksToSubtract = 12 - (weekNum - 1);
        const targetWeek = subWeeks(eventDate, weeksToSubtract);
        const workoutDate = setDay(targetWeek, dayNum, { weekStartsOn: 1 });

        return {
          week: weekNum,
          day: dayNum,
          date: workoutDate.toISOString().split('T')[0],
          focus: focus || '',
          workoutDetails: workoutDetails || '',
          notes: notes || '',
        };
      }).filter(workout => workout !== null);

      await snap.ref.update({
        status: 'complete',
        generatedPlan: personalizedPlan,
        planGeneratedAt: new Date(),
      });

      logger.info(`Successfully generated and stored plan for signup ID: ${signupId}`);

    } catch (error) {
      logger.error(`Failed to generate plan for ${signupId}:`, error);
      await snap.ref.update({
        status: 'error',
        errorMessage: error.message || 'An unknown error occurred.',
      });
    }
    return null;
  });
