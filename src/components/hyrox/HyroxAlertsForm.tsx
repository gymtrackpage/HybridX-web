
'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { subscribeToHyroxAlerts, type FormState } from '@/app/hyrox-alerts/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-bold 
               text-sm uppercase tracking-wider rounded-lg shadow-lg font-headline
               hover:shadow-xl hover:-translate-y-1 active:translate-y-0 
               disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none 
               transition-all duration-300"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing Up...
        </>
      ) : (
        'Get Event Notifications'
      )}
    </Button>
  );
}

export default function HyroxAlertsForm() {
  const initialState: FormState = { message: '', type: '' };
  const [state, formAction] = useFormState(subscribeToHyroxAlerts, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.type === 'success') {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="group">
        <Label 
          htmlFor="email" 
          className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wide font-body"
        >
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="your.email@example.com"
          required
          className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground placeholder-muted-foreground 
                   focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                   transition-all duration-300 group-hover:border-primary/50 font-body"
        />
      </div>

      <div className="group">
        <Label 
          htmlFor="firstName" 
          className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wide font-body"
        >
          First Name
        </Label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="John"
          required
          className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground placeholder-muted-foreground 
                   focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                   transition-all duration-300 group-hover:border-primary/50 font-body"
        />
      </div>

      <div className="group">
        <Label 
          htmlFor="location" 
          className="block text-sm font-semibold text-foreground mb-2 uppercase tracking-wide font-body"
        >
          Preferred Locations (Optional)
        </Label>
        <Input
          type="text"
          id="location"
          name="location"
          placeholder="e.g., London, Sydney, New York"
          className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground placeholder-muted-foreground 
                   focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                   transition-all duration-300 group-hover:border-primary/50 font-body"
        />
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          name="terms"
          required
          className="w-5 h-5 mt-1 accent-primary flex-shrink-0"
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed font-body">
          I agree to receive email notifications about new Hyrox events and understand I can unsubscribe at any time.
        </Label>
      </div>

      <SubmitButton />

      {state.message && (
        <div className={`mt-4 p-4 rounded-lg text-center font-semibold animate-in fade-in-0 slide-in-from-top-2 font-body ${
          state.type === 'success' 
            ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400' 
            : 'bg-destructive/10 border border-destructive/20 text-destructive'
        }`}>
          {state.message}
        </div>
      )}
    </form>
  );
}
