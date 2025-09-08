
'use client';

const SCRIPT_URL = 'https://script.google.com/a/macros/hybridx.club/s/AKfycbxCDBD1B5-1p2fF4_VJs2SCX2HdQm9V3PkWNEr2gn-1_Pedu2ogLmrciyze2iz_LWL4/exec';

export default function SignUpFormEmbed() {
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingTop: '120%' }}> {/* Aspect ratio container */}
      <iframe
        src={SCRIPT_URL}
        className="absolute top-0 left-0 w-full h-full border-0"
        style={{ border: 0 }}
        allowFullScreen={true}
        sandbox="allow-scripts allow-same-origin allow-forms"
        title="Sign Up Form"
      >
        Loading...
      </iframe>
    </div>
  );
}
