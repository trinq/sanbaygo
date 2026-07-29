import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

export function ArticleLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
