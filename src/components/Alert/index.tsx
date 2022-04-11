import React, { useCallback, useEffect } from 'react';
import { useActiveWeb3React } from '~/hooks/web3';
import { useRemoveAlertCallback } from '~/state/application/hooks';
import { ExplorerDataType, getExplorerLink } from '~/utilities/getExplorerLink';

const classMapping: Record<AlertSeverity, { background: string; text: string }> = {
  error: {
    background: 'bg-red-500',
    text: 'text-red-500 dark:text-red-400',
  },
  success: {
    background: 'bg-green-500',
    text: 'text-green-500 dark:text-green-400',
  },
  info: {
    background: 'bg-blue-500',
    text: 'text-blue-500 dark:text-blue-400',
  },
  warning: {
    background: 'bg-yellow-400',
    text: 'text-yellow-400 dark:text-yellow-300',
  },
};

const iconMapping: Record<AlertSeverity, React.ReactNode> = {
  success: (
    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
  ),
  error: (
    <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z" />
  ),
  info: (
    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
  ),
  warning: (
    <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
  ),
};

type AlertSeverity = 'error' | 'success' | 'info' | 'warning';
export interface AlertProps {
  severity: AlertSeverity;
  title: string;
  content: React.ReactNode;
  hash?: string;
}

export default function Alert({
  severity,
  title,
  content,
  alertKey,
  removeAfterMs,
  show,
  hash,
}: AlertProps & { show: boolean; alertKey: string; removeAfterMs: number | null }) {
  const { chainId } = useActiveWeb3React();

  const removeAlert = useRemoveAlertCallback();
  const removeThisAlert = useCallback(() => removeAlert(alertKey), [removeAlert, alertKey]);

  useEffect(() => {
    if (removeAfterMs === null) return undefined;
    const timeout = setTimeout(() => {
      removeThisAlert();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeThisAlert, removeAfterMs]);

  const colors = classMapping[severity];
  const icon = iconMapping[severity];

  if (!show) {
    return null;
  }
  return (
    <div
      className="
      relative
      flex
      w-full
      max-w-md
      mx-auto
      mt-4
      overflow-hidden
      bg-white
      rounded-lg
      shadow-md
      dark:bg-gray-800
      z-50	
    "
    >
      <div className={`flex items-center justify-center w-12 ${colors.background}`}>
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          {icon}
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3 mr-4">
        <div className="mx-3">
          <p className="text-sm text-gray-600 dark:text-gray-200">
            {content}{' '}
            {hash !== undefined && chainId && (
              <a
                target="_blank"
                rel="noreferrer"
                className="no-underline text-blue-500 dark:text-blue-400"
                href={getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)}
              >
                - View on Explorer
              </a>
            )}
          </p>
        </div>
      </div>

      <div className="order-2 sm:order-none w-1/12 sm:w-auto flex justify-end items-start sm:absolute sm:right-0 sm:mr-2 xl:mr-3">
        <button
          type="button"
          className="text-white hover:text-indigo-100 outline-none active:text-indigo-200 transition duration-100"
          onClick={removeThisAlert}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 xl:w-5 h-4 xl:h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
