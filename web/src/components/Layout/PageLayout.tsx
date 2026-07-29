// web/src/components/Layout/PageLayout.tsx
import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
