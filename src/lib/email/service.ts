import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

// Create a singleton transporter instance
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
        // In a real app, you'd want more robust error handling or logging here
        console.error("Missing SMTP environment variables");
        // Return a mock/dummy transporter or throw an error if preferred
        return nodemailer.createTransport({
            jsonTransport: true // Doesn't send emails, just generates messages
        });
    }
    
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

export const emailTransporter = getTransporter();
