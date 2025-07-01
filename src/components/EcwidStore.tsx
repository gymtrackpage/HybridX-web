
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// User's Ecwid Store ID
const ECWID_STORE_ID = '112581013';

// Extracted from the user-provided embed code for better management
const ecwidConfigArgs = [
    "categoriesPerRow=3",
    "views=grid(20,3) list(60) table(60)",
    "categoryView=grid",
    "searchView=list",
    `id=my-store-${ECWID_STORE_ID}`
];

export default function EcwidStore() {

  const initializeEcwid = () => {
    if (typeof window.xProductBrowser === 'function') {
        window.xProductBrowser(...ecwidConfigArgs);
    }
  }
  
  // This effect handles the case where the component might re-render after the
  // Ecwid script has already been loaded on the page.
  useEffect(() => {
    if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.OnAPILoaded.add(function() {
            initializeEcwid();
        });
    }
  }, []); // Empty dependency array ensures this runs only once on mount.


  if (ECWID_STORE_ID === 'YOUR_STORE_ID') {
    return (
        <div className="text-center p-8 bg-destructive/10 border border-destructive rounded-lg">
            <p className="font-bold text-destructive">Store Not Configured</p>
            <p className="text-destructive/90 mt-2">
                Please replace <code className="bg-destructive/20 px-1 py-0.5 rounded">'YOUR_STORE_ID'</code> with your actual Ecwid Store ID in the file <code className="bg-destructive/20 px-1 py-0.5 rounded">src/components/EcwidStore.tsx</code>.
            </p>
        </div>
    );
  }

  return (
    <>
      <div id={`my-store-${ECWID_STORE_ID}`}></div>
      <Script
        data-cfasync="false"
        type="text/javascript"
        src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code&data_date=2025-07-01`}
        charset="utf-8"
        strategy="lazyOnload"
        onLoad={initializeEcwid}
      />
    </>
  );
}

// Add types for Ecwid global objects to satisfy TypeScript
declare global {
  interface Window {
    xProductBrowser: (...args: string[]) => void;
    Ecwid: {
        OnAPILoaded: {
            add: (callback: () => void) => void;
        }
    }
  }
}
