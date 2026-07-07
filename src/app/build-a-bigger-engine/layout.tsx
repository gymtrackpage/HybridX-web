import { Anton, Archivo } from 'next/font/google';

// Display + label faces used only by this funnel. Declared here (not in the
// root layout) so the rest of the site doesn't pay their download cost.
const anton = Anton({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-anton',
  weight: ['400'],
});

const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['600', '700', '800', '900'],
});

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${anton.variable} ${archivo.variable}`}>{children}</div>;
}
