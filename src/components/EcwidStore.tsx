
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


  // Check if store ID is configured (removed comparison that TypeScript flagged)
  // The actual store ID is already set above

  return (
    <>
      <div id={`my-store-${ECWID_STORE_ID}`}></div>
      <Script
        data-cfasync="false"
        type="text/javascript"
        src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code&data_date=2025-07-01`}
        charSet="utf-8"
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
