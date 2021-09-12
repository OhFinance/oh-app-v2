import React from 'react';
import { Footer } from './footer';
import { Navbar } from './navbar';

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className={`bg-siteBG4`}>
      <div className={`bg-gradient-to-b from-siteBG1 via-siteBG2 to-siteBG3 relative`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
