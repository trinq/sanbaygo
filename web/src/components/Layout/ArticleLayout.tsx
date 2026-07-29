import type { ReactNode } from 'react';
import { Nav } from '../Landing/Nav';
import { Footer } from '../Landing/Footer';

interface Props {
  children: ReactNode;
  /** Path to the counterpart language page (e.g. EN page gets VI path, VI page gets EN path).
   *  When provided, the Nav renders a text link instead of the EN/VI toggle button. */
  languageSwitchPath?: string;
}

export function ArticleLayout({ children, languageSwitchPath }: Props) {
  return (
    <div className="min-h-screen bg-[#e6eff6]">
      <Nav languageSwitchPath={languageSwitchPath} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
