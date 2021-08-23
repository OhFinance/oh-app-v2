import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      <header className="h-24 sm:h-32 flex items-center z-30 w-full">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/">
            <a>
              <Image src="/img/oh_logo.png" width={98} height={60} alt="OH! Logo"></Image>
            </a>
          </Link>
          <div className="flex items-center">
            <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
              <Link href="faq">
                <a className="py-2 px-6 flex hover:text-pink-500 hover:border-b-2 hover:border-pink-500">
                  FAQ
                </a>
              </Link>
              <Link href="docs">
                <a className="py-2 px-6 flex hover:text-pink-500 hover:border-b-2 hover:border-pink-500">
                  Docs
                </a>
              </Link>
              <div>
                <span className="mr-2">Dark</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <label
                    htmlFor="blue"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="toggle"
                      id="blue"
                      className="outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                    />
                  </label>
                </div>
                <span>Light</span>
              </div>
              <button className="ml-6 py-1 px-2 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400">
                Connect Wallet
              </button>
            </nav>
            <button className="lg:hidden flex flex-col ml-4">
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
              <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1"></span>
            </button>
          </div>
        </div>
      </header>
      <div className="flex relative z-20 items-center">
        <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
          <div className="flex flex-col">
            <h1 className="max-w-4xl text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
              <span className="text-pink-500">Earn More</span> with your{' '}
              <span className="text-pink-500">DeFi</span> dollar
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
