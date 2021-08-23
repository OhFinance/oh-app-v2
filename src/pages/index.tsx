import styles from '$/Home.module.css';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
      <div className="flex relative z-20 items-center">
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
    </main>
  );
};

export default Home;
