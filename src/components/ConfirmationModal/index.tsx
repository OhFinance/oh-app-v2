import React from 'react';

export default function ConfirmationModal() {
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed backdrop-blur-sm inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-consoleBGOuter border-consoleBorderInner border-2 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="border-consoleBorderInner bg-consoleBGOuter px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 container text-center sm:mt-0 ">
                <h3 className="text-xl font-medium text-defaultText text-center" id="modal-title">
                  Waiting on blockchain confirmation
                </h3>
                {/* {!connector && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500"> Connect to a supported wallet</p>
                  </div>
                )} */}
              </div>
            </div>
          </div>

          <div className="flex flex-col m-4">
            <div className="flex justify-center items-center">
              <div
                className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-defaultText"
                style={{
                  verticalAlign: '-0.125em',
                  border: '0.25em solid',
                  borderRightColor: 'transparent',
                }}
                role="status"
              ></div>
            </div>
            {/* {connector ? (
              <button
                onClick={() => {
                  if (connector !== injected && connector !== walletlink) {
                    (connector as any).close();
                  }
                }}
                className={` ${
                  connector !== injected && connector !== walletlink
                    ? 'bg-inputBG hover:bg-buttonHighlight hover:text-white '
                    : 'bg-buttonDisabled'
                }  text-button font-bold py-4 px-4 rounded`}
              >
                {connector !== injected && connector !== walletlink
                  ? 'Disconnect'
                  : 'Disconnect in Wallet'}
              </button>
            ) : (
              getOptions()
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
