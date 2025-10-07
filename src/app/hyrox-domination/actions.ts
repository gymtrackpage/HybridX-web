'use server';

import { z } from 'zod';
import { firestore } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SignUpSchema = z.object({
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

  const { email, event, eventDate } = validatedFields.data;

  try {
    // Save to Firestore
    await addDoc(collection(firestore, 'trainingPlanSignups'), {
      email,
      event,
      eventDate,
      createdAt: serverTimestamp(),
      status: 'processing',
    });

    // Generate the PDF training plan
    const { generateTrainingPlanPDF } = await import('@/lib/training-plan/generate-plan');
    const pdfBuffer = await generateTrainingPlanPDF(eventDate, event, email);

    // Send email with PDF
    const { sendTrainingPlanEmail } = await import('@/lib/email/send-training-plan');
    await sendTrainingPlanEmail(email, event, eventDate, pdfBuffer);

    return {
      message: 'Success! Your custom training plan has been sent to your email. Check your inbox!',
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
