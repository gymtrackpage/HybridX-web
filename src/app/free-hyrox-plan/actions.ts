
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

  try {
    // Log the submission for now (you can add Firestore later with admin SDK)
    console.log('Training plan signup:', { name, email, event, eventDate });

    // TODO: Save to Firestore using Firebase Admin SDK (not client SDK)
    // For now, we'll just return success so the PDF generation works

    return {
      message: 'Success! Your personalized training plan PDF is downloading now. Check your downloads folder!',
      type: 'success',
    };

  } catch (error) {
    console.error('Error processing signup:', error);
    return {
      message: 'An unexpected error occurred on the server. Please try again.',
      type: 'error',

    };
  }
}
