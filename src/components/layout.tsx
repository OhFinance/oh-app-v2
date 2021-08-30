import { Footer } from '~/components/Footer';
import { Navbar } from '~/components/Navbar';

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
