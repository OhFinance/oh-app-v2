import Link from 'next/link';
import React from 'react';
import { useThemeStore } from '~/stores/useThemeStore';

export function Footer() {
  const { theme } = useThemeStore();

  return (
    <>
      <footer className="pt-4 pb-8 xl:pt-8 bg-footerBG">
        <div className="max-w-screen-lg xl:max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 text-defaultText">
          <ul className="text-lg font-light pb-8 flex flex-col lg:flex-row justify-center space-x-0 pl-6 lg:pl-0">
            <li className="w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-left lg:text-center">
                <h2 className="text-accentText text-2xl mb-4">Resources</h2>
                <ul>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <Link href="/faq">
                      <a>FAQ</a>
                    </Link>
                  </li>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <Link href="/docs">
                      <a>Docs</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-left lg:text-center">
                <h2 className="text-accentText text-2xl mb-4 pt-8 lg:pt-0">Contacts</h2>
                <ul>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <Link href="/">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <Link href="/">
                      <a>Risks</a>
                    </Link>
                  </li>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <Link href="/">
                      <a>Terms of use</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li className="w-1/2 md:w-1/3 lg:w-1/3">
              <div className="text-left lg:text-center">
                <h2 className="text-accentText text-2xl mb-4 pt-8 lg:pt-0">Community</h2>
                <ul className="flex flex-row lg:flex-col items-center">
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <a href="https://www.twitter.com">
                      <img
                        width={32}
                        height={26}
                        className="ml-2 mr-2"
                        alt="Twitter"
                        src={`/img/SocialTwitterIcon_${theme}.png`}
                      />
                    </a>
                  </li>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <a href="https://www.facebook.com">
                      <img
                        width={20}
                        height={37}
                        className="ml-2 mr-2"
                        alt="Facebook"
                        src={`/img/SocialFacebookIcon_${theme}.png`}
                      />
                    </a>
                  </li>
                  <li className="mb-4 hover:text-accentText transition-colors duration-200">
                    <a href="https://www.medium.com">
                      <img
                        width={32}
                        height={26}
                        className="ml-2 mr-2"
                        alt="Medium"
                        src={`/img/SocialMediumIcon_${theme}.png`}
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center">
            Copyright © 2021 Oh! Finance. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
