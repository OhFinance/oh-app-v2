import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
