'use server';

import { z } from 'zod';
import { headers } from 'next/headers';
import { saveLead } from '@/lib/leads';

const SubscribeSchema = z.object({
  firstName: z.string().trim().min(1, { message: 'Please enter your first name.' }),
  email: z.string().trim().toLowerCase().email({ message: 'Please enter a valid email address.' }),
});

export type SubscribeState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function subscribeToNewsletter(
  _prevState: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  const parsed = SubscribeSchema.safeParse({
    firstName: formData.get('firstName'),
    email: formData.get('email'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.errors[0]?.message || 'Please check your details and try again.',
    };
  }

  const { firstName, email } = parsed.data;

  const hdrs = await headers();
  const ip = hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() || hdrs.get('x-real-ip') || 'unknown';
  const userAgent = hdrs.get('user-agent') || '';

  try {
    await saveLead({
      source: 'sign_up',
      email,
      name: firstName,
      ip,
      userAgent,
    });
  } catch (error) {
    console.error('[sign-up] Failed to save lead:', error);
    return {
      status: 'error',
      message: 'We could not save your details just now. Please try again in a moment.',
    };
  }

  return {
    status: 'success',
    message: 'Thank you for subscribing! Your first email is on its way.',
  };
}
