import styles from '$/Home.module.css';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden">
      <div className="flex items-center h-auto">
        <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl font-bold mx-auto dark:text-white text-gray-800 text-center py-2">
              <span className="text-pink-500">Earn More</span> with your{' '}
              <span className="text-pink-500">DeFi</span> dollar
            </h1>
          </div>
          <p className="pt-20 text-3xl max-w-3xl justify-center dark:text-white text-gray-800 text-center py-2">
            Start by earning up to <span className="text-pink-500">10-21%</span> APY on USDC
            <br className={styles['cta-line-break']}></br> + a bonus{' '}
            <span className="text-pink-500">10-30%*</span> OH! reward in just{' '}
            <span className="text-pink-500">two clicks!</span>
          </p>
          <div className="mt-10 flex flex-col shadow-lg rounded-lg p-10 w-96 bg-black">
            <button className="py-1 px-2 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md hover:bg-pink-400">
              Connect Wallet to get started
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} mt-36 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
      >
        <div className="p-6 flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="h-auto container flex flex-col justify-between w-1/4 h-auto">
              <div className="h-96 flex flex-row rounded-lg bg-gray-800 opacity-75"></div>
              <div className="h-64 mt-4 flex flex-row rounded-lg bg-gray-800 opacity-75"></div>
            </div>
            <div className="ml-6 h-full container flex flex-col justify-between rounded-lg w-3/4 h-auto bg-gray-800 opacity-75"></div>
          </div>
          <div className="flex flex-row justify-between"></div>
        </div>
      </div>
      <div
        className={`${styles['main-container']} mt-6 mx-auto flex flex-col justify-between shadow-lg rounded-lg bg-black h-auto items-center`}
      >
        <div className="p-2 flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="h-36 container flex flex-col justify-between rounded-lg w-1/4 h-auto bg-gray-800 opacity-75"></div>
            <div className="ml-6 h-36 container flex flex-col justify-between rounded-lg w-3/4 h-auto bg-gray-800 opacity-75"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
