import { renderToBuffer } from '@react-pdf/renderer';
import { TrainingPlanPDF } from './pdf-generator';
import { parseTrainingPlanCSV } from './csv-parser';
import React from 'react';

export async function generateTrainingPlanPDF(
  eventDate: string,
  eventName: string,
  userEmail: string
): Promise<Buffer> {
  // Parse the CSV and calculate dates
  const trainingPlan = await parseTrainingPlanCSV(eventDate, eventName, userEmail);

  // Generate PDF
  const pdfDocument = React.createElement(TrainingPlanPDF, { trainingPlan });
  const pdfBuffer = await renderToBuffer(pdfDocument as any);

  return pdfBuffer;
}
