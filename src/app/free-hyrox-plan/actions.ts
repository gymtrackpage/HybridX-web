
'use server';

import { z } from 'zod';

const SignUpSchema = z.object({
  name: z.string().min(2, { message: 'Please enter your name.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  event: z.string().min(1, { message: 'Please select an event.' }),
  eventDate: z.string().min(1, { message: 'Please select an event date.' }),
});

export type SignUpFormState = {
  message: string;
  type: 'success' | 'error' | '';
};

export async function signUpForTrainingPlan(
  prevState: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState> {
  const validatedFields = SignUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    event: formData.get('event'),
    eventDate: formData.get('eventDate'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(' '),
      type: 'error',
    };
  }

  const { name, email, event, eventDate } = validatedFields.data;
  const scriptUrl = process.env.NEXT_PUBLIC_HYROX_SCRIPT_URL;

  if (!scriptUrl) {
    console.error('Google Apps Script URL is not defined in environment variables.');
    return {
      message: 'Server configuration error. Could not process signup.',
      type: 'error',
    };
  }

  try {
    // Send data to Google Apps Script
    await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, event, eventDate }),
      // We don't wait for the response to make the UX faster.
      // The Apps Script will handle the rest.
    });

    return {
      message: 'Success! Your personalized training plan PDF is downloading now. Check your downloads folder!',
      type: 'success',
    };

  } catch (error) {
    console.error('Error sending data to Google Sheet:', error);
    // Even if the sheet fails, we can still proceed with the PDF download for the user
    // You might want to add more robust error handling here, like logging to a dedicated service.
    return {
      message: 'Success! Your PDF is downloading. (Note: There was an issue saving to our sheet.)',
      type: 'success', // Still a success for the user
    };
  }
}
