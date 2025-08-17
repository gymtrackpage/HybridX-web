'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { signUpForTrainingPlan, type SignUpFormState } from '@/app/hyrox-domination/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


// A list of upcoming Hyrox events. In a real application, this would
// likely be fetched from a database or an external API.
const hyroxEvents = [
  { name: 'London Olympia', date: '2024-11-30' },
  { name: 'Amsterdam', date: '2025-01-18' },
  { name: 'Dublin', date: '2025-03-01' },
  { name: 'Copenhagen', date: '2025-03-22' },
  { name: 'Berlin', date: '2025-04-05' },
  { name: 'Manchester', date: '2025-05-03' },
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full py-4 px-6 bg-accent text-accent-foreground hover:bg-accent/90 font-bold 
               text-base uppercase tracking-wider rounded-lg shadow-lg font-headline
               hover:shadow-xl hover:-translate-y-1 active:translate-y-0 
               disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none 
               transition-all duration-300"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating Plan...
        </>
      ) : (
        'Get My Free Plan'
      )}
    </Button>
  );
}

const FormSchema = z.object({
  email: z.string().email(),
  event: z.string(),
});


export default function HyroxDominationForm() {
  const initialState: SignUpFormState = { message: '', type: '' };
  const [state, formAction] = useFormState(signUpForTrainingPlan, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  
  // zod validation for client side
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      event: "",
    },
  });

  useEffect(() => {
    if (state.type === 'success') {
      formRef.current?.reset();
      form.reset();
    }
  }, [state, form]);

  return (
    <Form {...form}>
      <form ref={formRef} action={formAction} className="space-y-6">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <Label 
                htmlFor="email" 
                className="block text-sm font-semibold text-foreground mb-2 text-left"
                >
                Email Address
                </Label>
                <FormControl>
                <Input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground placeholder-muted-foreground 
                            focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                            transition-all duration-300 font-body"
                    {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
       
        <FormField
            control={form.control}
            name="event"
            render={({ field }) => (
                <FormItem>
                    <Label htmlFor="event" className="block text-sm font-semibold text-foreground mb-2 text-left">
                        Select Your Hyrox Event
                    </Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground 
                                                focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                                                transition-all duration-300 font-body h-auto">
                            <SelectValue placeholder="Choose your race..." />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {hyroxEvents.map((event) => (
                            <SelectItem key={event.name} value={`${event.name} (${event.date})`}>
                            {event.name} - {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

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
    </Form>
  );
}
