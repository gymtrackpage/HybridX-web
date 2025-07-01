
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// IMPORTANT: Replace this with your actual Ecwid Store ID
const ECWID_STORE_ID = 'YOUR_STORE_ID';

export default function EcwidStore() {

  // This effect handles the case where the component might re-render.
  // Ecwid's script is designed to be loaded once. The `Ecwid.OnAPILoaded.add` ensures
  // the product browser is re-initialized if needed.
  useEffect(() => {
    if (typeof window.Ecwid !== 'undefined') {
        window.Ecwid.OnAPILoaded.add(function() {
            if (typeof window.xProductBrowser === 'function') {
                window.xProductBrowser(`id=my-store-${ECWID_STORE_ID}`);
            }
        });
    }
  }, []);


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
        src={`https://app.ecwid.com/script.js?${ECWID_STORE_ID}&data_platform=code`}
        charset="utf-8"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window.xProductBrowser === 'function') {
            window.xProductBrowser(`id=my-store-${ECWID_STORE_ID}`);
          }
        }}
      />
    </>
  );
}

// Add types for Ecwid global objects to satisfy TypeScript
declare global {
  interface Window {
    xProductBrowser: (id: string) => void;
    Ecwid: {
        OnAPILoaded: {
            add: (callback: () => void) => void;
        }
    }
  }
}
