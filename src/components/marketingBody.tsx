import React from 'react';
import styles from '~/pages/__styles__/index.module.css';
import { textPink } from '~/tempTailwindConfig';

export function MarketingBody() {
  return (
    <div
      // Parent Container
      id="marketing-body"
    >
      <div // Tagline
        className="text-center items-center p-44"
      >
        <p className="text-6xl text-white">Fight back with the future of money</p>
        <p className="text-3xl text-white pt-16">
          Simply deposit USDC and Oh! Finance aggregates popular DeFi investment strategies and
          automatically compounds your earnings.
        </p>
      </div>

      <div // Marketing Graphics
        className="flex justify-center"
      >
        <img
          className="px-6"
          alt="Marketing Graphic 1"
          src="/img/OhFinanceAssets_marketingGraphic1.png"
        />

        <img
          className="px-6"
          alt="Marketing Graphic 2"
          src="/img/OhFinanceAssets_marketingGraphic2.png"
        />

        <img
          className="px-6"
          alt="Marketing Graphic 3"
          src="/img/OhFinanceAssets_marketingGraphic3.png"
        />
      </div>

      <div // How It Works
        className="flex justify-center items-center text-center py-44"
      >
        <img
          width={671}
          height={419}
          className="px-6"
          alt="OH! Does it for you"
          src="/img/OhFinanceAssets_OhSection1Image.png"
        />
        <div className="-mt-20">
          <p className="text-white text-6xl">OH! Does it for you</p>
          <p className="text-white text-3xl pt-20">
            Gain exposure to a{' '}
            <span className={`${textPink}`}>managed index of DeFi strategies</span> , designed to
            increase volume exposure and reduce Smart Contract risk.
          </p>
        </div>
      </div>

      <div // Strategic Partners
        className="bg-gray-900 items-center text-center py-20"
      >
        <p className="text-6xl text-white pb-24">Strategic Partners</p>
        <div className="flex justify-center">
          <img className="" alt="Bridge Logo" src="/img/OhFinanceAssets_PartnersLogo1.png" />
          <img className="" alt="Ava Labs Logo" src="/img/OhFinanceAssets_PartnersLogo2.png" />
          <img className="" alt="Avalance Logo" src="/img/OhFinanceAssets_PartnersLogo3.png" />
        </div>

        <p className="text-white text-3xl pt-20">Testimonials</p>
        <p className="text-pink-600 text-5xl pt-20">
          "Something something amazing so<br className={styles['cta-line-break']}></br> good we are
          going to the moon!"
        </p>
        <p className="text-pink-600 text-2xl pt-4">-Satoshi Nakamoto</p>
      </div>

      <div // Roadmap
        className="items-center text-center py-20"
      >
        <p className="text-white text-6xl py-20">Roadmap</p>
        <img className="" alt="Roadmap" src="/img/OhFinanceAssets_timeline1.png" />
      </div>
    </div>
  );
}
