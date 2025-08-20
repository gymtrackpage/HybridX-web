
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { firestore } from '@/lib/firebase';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';


interface HyroxEvent {
    id: string;
    name: string;
    date: Date;
}

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
  event: z.string().min(1, { message: "Please select an event." }),
});


export default function HyroxDominationForm() {
  const initialState: SignUpFormState = { message: '', type: '' };
  const [state, formAction] = useActionState(signUpForTrainingPlan, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [hyroxEvents, setHyroxEvents] = useState<HyroxEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  
  // zod validation for client side
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      event: "",
    },
  });

  useEffect(() => {
      async function fetchEvents() {
          setEventsLoading(true);
          try {
              const eventsCollection = collection(firestore, 'hyroxEvents');
              const now = new Date();
              // Query for events where the date is in the future, ordered by date
              const q = query(
                eventsCollection, 
                where('date', '>=', Timestamp.fromDate(now)), 
                orderBy('date', 'asc')
              );
              
              const querySnapshot = await getDocs(q);
              const eventsList = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const eventDate = (data.date as Timestamp).toDate();
                    return {
                        id: doc.id,
                        name: data.name,
                        date: eventDate,
                    };
                });
              
              setHyroxEvents(eventsList);
          } catch (error) {
              console.error("Error fetching events from Firestore:", error);
              // Optionally set an error state to show in the UI
          } finally {
              setEventsLoading(false);
          }
      }
      fetchEvents();
  }, []);

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
                    <Select onValueChange={field.onChange} value={field.value} disabled={eventsLoading || hyroxEvents.length === 0}>
                        <FormControl>
                        <SelectTrigger className="w-full px-4 py-3 bg-input border-2 border-border rounded-lg text-foreground 
                                                focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 
                                                transition-all duration-300 font-body h-auto">
                            <SelectValue placeholder={eventsLoading ? "Loading events..." : (hyroxEvents.length === 0 ? "No Events Found" : "Choose your race...")} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {hyroxEvents.map((event) => (
                            <SelectItem key={event.id} value={`${event.name} | ${event.date.toISOString()}`}>
                                {event.name} - {event.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </SelectItem>
                        ))}
                        {eventsLoading && <SelectItem value="loading" disabled>Loading...</SelectItem>}
                        {!eventsLoading && hyroxEvents.length === 0 && <SelectItem value="no-events" disabled>No upcoming events found.</SelectItem>}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />

        <SubmitButton />

        {state.message && (
            <div className={`mt-4 p-4 rounded-lg text-center font-semibold animate-in fade-in-from-top-2 font-body ${
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
