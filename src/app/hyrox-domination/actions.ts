'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SignUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  event: z.string().min(1, { message: 'Please select an event.' }),
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
    email: formData.get('email'),
    event: formData.get('event'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.errors.map((e) => e.message).join(' '),
      type: 'error',
    };
  }

  const { email, event } = validatedFields.data;

  try {
    await addDoc(collection(firestore, 'trainingPlanSignups'), {
      email,
      event,
      createdAt: serverTimestamp(),
    });

    // Here is where you would trigger the next steps, like a Cloud Function.
    // For now, we'll return a success message.
    
    return {
      message: 'Success! Your plan is being generated. Check your email shortly.',
      type: 'success',
    };

  } catch (error) {
    console.error('Error adding document to Firestore:', error);
    return {
      message: 'An unexpected error occurred on the server. Please try again.',
      type: 'error',
    };
  }
}
