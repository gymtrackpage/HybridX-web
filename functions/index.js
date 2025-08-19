
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, Timestamp } = require("firebase-admin/firestore");
const { google } = require("googleapis");
const logger = require("firebase-functions/logger");

// Initialize Firebase Admin SDK
initializeApp();
const db = getFirestore();

// Config is loaded from environment variables set in the console
const SPREADSHEET_ID = process.env.SHEETS_ID;
const API_KEY = process.env.SHEETS_KEY;
const SHEET_NAME = "Sheet1"; // Corrected to match your Google Sheet tab name

exports.syncEventsFromGoogleSheet = functions.pubsub
  .schedule("every 12 hours")
  .onRun(async (context) => {
    logger.info("Starting Hyrox event sync from Google Sheet.");

    if (!SPREADSHEET_ID || !API_KEY) {
      logger.error("Spreadsheet ID or API Key is not configured in environment variables.");
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Missing configuration."
      );
    }

    try {
      // 1. Fetch data from Google Sheet
      const sheets = google.sheets({ version: "v4", auth: API_KEY });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A:B`, // Assuming Name is in Col A, Date in Col B
      });

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
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
            // Basic validation
            if (!isNaN(date.getTime()) && date > new Date()) {
                return { name, date: Timestamp.fromDate(date) };
            }
            return null;
        })
        .filter(event => event !== null);


      // 2. Update Firestore
      const eventsCollection = db.collection("hyroxEvents");
      const batch = db.batch();
      
      const snapshot = await eventsCollection.get();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      logger.info(`Deleting ${snapshot.size} old events.`);

      newEvents.forEach((event) => {
        const docRef = eventsCollection.doc(); // Auto-generate ID
        batch.set(docRef, event);
      });
      logger.info(`Adding ${newEvents.length} new events.`);

      await batch.commit();

      logger.info("Successfully synchronized Hyrox events to Firestore.");
      
    } catch (error) {
      logger.error("Error syncing events from Google Sheet:", error);
      if (error.code === 403) {
          logger.error("Permission denied. Ensure the Google Sheets API is enabled and the API key is correct and has access.");
      }
      throw new functions.https.HttpsError(
        "internal",
        "Failed to sync events."
      );
    }
  });
