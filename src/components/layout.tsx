import { Footer } from './footer';
import { Navbar } from './navbar';

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
