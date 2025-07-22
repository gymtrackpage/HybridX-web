
'use server';

import { z } from 'zod';

const SCRIPT_URL = process.env.NEXT_PUBLIC_HYROX_SCRIPT_URL;

const schema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  location: z.string().optional(),
  terms: z.string().refine(val => val === 'on', { message: "You must agree to the terms." }),
});

export type FormState = {
  message: string;
  type: 'success' | 'error' | '';
};

export async function subscribeToHyroxAlerts(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  if (!SCRIPT_URL) {
    return {
      message: 'Server configuration error. Missing script URL.',
      type: 'error',
    };
  }

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    firstName: formData.get('firstName'),
    location: formData.get('location'),
    terms: formData.get('terms'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(' '),
      type: 'error',
    };
  }

  const { email, firstName, location } = validatedFields.data;

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        firstName,
        location,
        timestamp: new Date().toISOString(),
      }),
      // Apps Script web apps often require a redirect to be handled
      redirect: 'follow', 
    });
    
    // Google Apps Script responses can be tricky. A successful POST might
    // return a 302 redirect. We'll check for ok status primarily.
    if (!response.ok && response.status !== 302) {
      // Try to parse error if available, otherwise use a generic message
      let errorBody = 'Unknown error occurred.';
      try {
        const errorResult = await response.json();
        errorBody = errorResult.error || errorBody;
      } catch (e) {
        // Ignore if parsing fails
      }
      throw new Error(`Request failed: ${errorBody}`);
    }

    return {
      message: '🎉 Success! You\'ll receive notifications for new Hyrox events.',
      type: 'success',
    };
    
  } catch (error) {
    console.error('Error submitting to Google Apps Script:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `❌ Sorry, there was an error: ${errorMessage}`,
      type: 'error',
    };
  }
}
