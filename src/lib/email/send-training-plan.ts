import { sendEmail } from './service';

export async function sendTrainingPlanEmail(
  userEmail: string,
  eventName: string,
  eventDate: string,
  pdfBuffer: Buffer
): Promise<void> {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const text = [
    `Your Custom Hyrox Training Plan - ${eventName}`,
    '',
    `Your personalized 84-day Hyrox Fusion Training Plan is attached and ready to go.`,
    '',
    `Event: ${eventName}`,
    `Race Date: ${formattedDate}`,
    `Program Duration: 84 Days (12 Weeks)`,
    '',
    'Next steps:',
    '1. Download and save your PDF training plan',
    '2. Review the program overview',
    '3. Mark your calendar with your start date',
    '4. Get ready to crush your Hyrox goals',
    '',
    'Train hard, race smart!',
    'The HybridX Team',
    'https://hybridx.club',
  ].join('\n');

  // Send email with PDF attachment
  await sendEmail({
    to: userEmail,
    subject: `Your Custom Hyrox Training Plan - ${eventName}`,
    text,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fadb5c; padding: 20px; text-align: center;">
          <h1 style="margin: 0; color: #000000;">Your Custom Hyrox Training Plan</h1>
        </div>

        <div style="padding: 30px; background-color: #ffffff;">
          <h2 style="color: #000000;">Ready to Dominate ${eventName}?</h2>

          <p style="color: #333333; line-height: 1.6;">
            Your personalized 84-day <strong>Hyrox Fusion Training Plan</strong> is attached and ready to go!
          </p>

          <div style="background-color: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #fadb5c;">
            <p style="margin: 5px 0;"><strong>Event:</strong> ${eventName}</p>
            <p style="margin: 5px 0;"><strong>Race Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Program Duration:</strong> 84 Days (12 Weeks)</p>
          </div>

          <h3 style="color: #000000;">What's Inside:</h3>
          <ul style="color: #333333; line-height: 1.8;">
            <li>84 days of structured training</li>
            <li>Balanced blend of strength, running, and Hyrox-specific workouts</li>
            <li>3-4 workouts per week designed for busy athletes</li>
            <li>Progressive programming leading to peak performance on race day</li>
            <li>Every workout dated and ready to execute</li>
          </ul>

          <h3 style="color: #000000;">Next Steps:</h3>
          <ol style="color: #333333; line-height: 1.8;">
            <li>Download and save your PDF training plan</li>
            <li>Review the program overview</li>
            <li>Mark your calendar with your start date</li>
            <li>Get ready to crush your Hyrox goals!</li>
          </ol>

          <p style="color: #333333; margin-top: 30px;">
            Good luck with your training! If you have any questions, feel free to reach out.
          </p>

          <p style="color: #333333;">
            <strong>Train hard, race smart!</strong><br>
            The HybridX Team
          </p>
        </div>

        <div style="background-color: #000000; padding: 20px; text-align: center; color: #ffffff; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} HybridX. All rights reserved.</p>
          <p style="margin: 10px 0 0 0;">
            <a href="https://hybridx.club" style="color: #fadb5c; text-decoration: none;">hybridx.club</a>
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: `hyrox-training-plan-${eventName.replace(/\s+/g, '-').toLowerCase()}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  });
}
