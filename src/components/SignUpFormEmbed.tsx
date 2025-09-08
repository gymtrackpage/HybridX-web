'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input'; 
import { Button } from '@/components/ui/button';

// This is the URL you got when you deployed your Apps Script Web App
const SCRIPT_URL = 'https://script.google.com/a/macros/hybridx.club/s/AKfycbxCDBD1B5-1p2fF4_VJs2SCX2HdQm9V3PkWNEr2gn-1_Pedu2ogLmrciyze2iz_LWL4/exec';

export default function SignUpFormEmbed() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // This is important for Apps Script to avoid CORS errors
        headers: {
          'Content-Type': 'application/json',
        },
        // The Apps Script expects a stringified object in e.postData.contents
        body: JSON.stringify({
          firstName,
          email,
        }),
      });
      
      // Because of the 'no-cors' mode and how Apps Script redirects after POST,
      // we can't actually read the JSON response directly from the browser for security reasons.
      // So, we will assume success if the request doesn't throw an error.
      // The back-end logic handles duplicates and errors gracefully.
      setStatus('success');
      setMessage('Thank you for subscribing! Your first email is on its way.');
      setFirstName('');
      setEmail('');

    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
      console.error('Submission Error:', error);
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center p-4 bg-green-900/20 border border-green-500 rounded-md">
        <h3 className="font-headline text-xl text-primary">Success!</h3>
        <p className="text-muted-foreground mt-2">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Your First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        disabled={status === 'loading'}
        className="font-body"
      />
      <Input
        type="email"
        placeholder="Your Best Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        className="font-body"
      />
      <Button
        type="submit"
        className="w-full font-headline"
        disabled={status === 'loading'}
        style={{ 
          backgroundColor: 'hsl(var(--primary))', 
          color: 'hsl(var(--primary-foreground))' 
        }}
      >
        {status === 'loading' ? 'Submitting...' : 'GET EARLY ACCESS'}
      </Button>
      {status === 'error' && (
        <p className="text-sm text-center text-destructive">{message}</p>
      )}
    </form>
  );
}
