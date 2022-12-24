import Button from 'components/Button';
import { CurrencyInput } from 'components/CurrencyInput';
import SwapNavigation from 'components/SwapNavigation';
import styled from 'styled-components';
import { AutoColumn } from '../components/Column';

const SwapWrapper = styled.div(({ theme }) => ({
  flexFlow: 'column nowrap',
  flex: '0 1 300px',
  padding: 6,
  flexGrow: 1,
  position: 'relative',
}));

const Gradient = styled.div`
  width: 400px;
  padding-top: 100%;
  background: linear-gradient(180deg, #001657 0%, #e7018c 100%);
  filter: blur(150px);
  border-radius: 20px;
`;

const Oval = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0%);
  width: 350px;
  padding-top: 10%;
  background: #009ce2;
  filter: blur(100px);
`;

const Figures = styled.div`
  position: relative;
  max-width: 615px;
  width: 100%;
`;

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Box = styled.div(({ theme }) => ({
  maxWidth: '615px',
  borderRadius: 20,
  width: '100%',
  backgroundColor: '#001657',
  overflow: 'visible',
}));

const Header = styled.div({
  backgroundColor: '#020B38',
  boxShadow: 'inner 0px 0px 0px 0px #001F71',

  borderRadius: '20px 20px 0px 0px',
});

const HeaderContent = styled.div`
  width: 100%;
  padding: 21px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Cog = ({ ...all }: any) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...all}
  >
    <path
      d="M19.3187 8.05078L17.5788 7.47082C17.4605 7.11111 17.3168 6.76025 17.1488 6.4209L17.9988 4.79101C18.0913 4.60354 18.1227 4.39178 18.0887 4.18551C18.0546 3.97925 17.9567 3.78885 17.8088 3.6411L16.3589 2.2212C16.2147 2.06834 16.0259 1.96481 15.8195 1.92532C15.6131 1.88583 15.3995 1.91238 15.209 2.00122L13.5791 2.82116C13.2397 2.65316 12.8889 2.50948 12.5292 2.39119L11.9992 0.681311C11.9296 0.474345 11.7942 0.29584 11.6137 0.173062C11.4331 0.0502827 11.2173 -0.0100214 10.9993 0.00135986H8.99944C8.78981 0.000818737 8.58531 0.0661741 8.41485 0.188188C8.24439 0.310202 8.11659 0.482704 8.04951 0.681311L7.46955 2.42118C7.10984 2.53948 6.75898 2.68316 6.41962 2.85115L4.78974 2.00122C4.60226 1.9087 4.39051 1.87727 4.18424 1.91135C3.97797 1.94543 3.78758 2.0433 3.63982 2.1912L2.21993 3.6411C2.06706 3.78533 1.96353 3.97407 1.92404 4.18049C1.88455 4.38692 1.91111 4.60054 1.99994 4.79101L2.81988 6.4209C2.65189 6.76025 2.50821 7.11111 2.38991 7.47082L0.65004 8.05078C0.45704 8.12287 0.291019 8.25282 0.17468 8.42285C0.0583412 8.59288 -0.00263577 8.7947 8.73926e-05 9.00071V11.0006C-0.00045373 11.2102 0.0649016 11.4147 0.186916 11.5852C0.30893 11.7556 0.481432 11.8834 0.680038 11.9505L2.41991 12.5305C2.53821 12.8902 2.68189 13.241 2.84988 13.5804L1.99994 15.2103C1.90743 15.3977 1.876 15.6095 1.91007 15.8158C1.94415 16.022 2.04203 16.2124 2.18993 16.3602L3.60983 17.7801C3.7562 17.9395 3.95035 18.0471 4.16311 18.0868C4.37587 18.1265 4.59575 18.096 4.78974 18.0001L6.41962 17.1801C6.75898 17.3481 7.10984 17.4918 7.46955 17.6101L8.04951 19.35C8.1216 19.543 8.25154 19.709 8.42158 19.8253C8.59161 19.9417 8.79343 20.0026 8.99944 19.9999H10.9993C11.2089 20.0005 11.4134 19.9351 11.5839 19.8131C11.7543 19.6911 11.8821 19.5186 11.9492 19.32L12.5292 17.5801C12.8889 17.4618 13.2397 17.3181 13.5791 17.1501L15.209 17.9701C15.3965 18.0626 15.6082 18.094 15.8145 18.0599C16.0208 18.0258 16.2111 17.928 16.3589 17.7801L17.7788 16.3602C17.9317 16.2159 18.0352 16.0272 18.0747 15.8208C18.1142 15.6144 18.0876 15.4007 17.9988 15.2103L17.1788 13.5804C17.3468 13.241 17.4905 12.8902 17.6088 12.5305L19.3187 12.0005C19.5257 11.9309 19.7042 11.7955 19.8269 11.615C19.9497 11.4344 20.01 11.2186 19.9986 11.0006V9.00071C19.9992 8.79108 19.9338 8.58658 19.8118 8.41612C19.6898 8.24566 19.5173 8.11786 19.3187 8.05078ZM9.99936 14.0003C9.2083 14.0003 8.43499 13.7658 7.77724 13.3263C7.11949 12.8868 6.60684 12.2621 6.30411 11.5313C6.00138 10.8004 5.92218 9.9962 6.07651 9.22033C6.23084 8.44446 6.61177 7.73178 7.17114 7.17241C7.73051 6.61304 8.44319 6.23211 9.21906 6.07778C9.99493 5.92345 10.7991 6.00266 11.53 6.30539C12.2608 6.60811 12.8855 7.12077 13.325 7.77852C13.7645 8.43627 13.9991 9.20957 13.9991 10.0006C13.9991 11.0614 13.5777 12.0788 12.8276 12.8289C12.0775 13.5789 11.0602 14.0003 9.99936 14.0003Z"
      fill="#009CE2"
    />
  </svg>
);

const CogButton = styled(Cog)`
  color: #009ce2;
  fill: #009ce2;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const SwapBody = styled.div`
  width: 100%;
  padding: 32px;
`;
export default function SwapPage() {
  return (
    <SwapWrapper>
      <Background>
        <Figures>
          <Oval></Oval>
          <Gradient />
        </Figures>
      </Background>

      <Content>
        <Box>
          <Header>
            <HeaderContent>
              <div></div>
              <SwapNavigation />
              <CogButton />
            </HeaderContent>
          </Header>
          <SwapBody>
            <AutoColumn gap={'sm'}>
              <div style={{ display: 'relative' }}>
                <CurrencyInput
                  value=""
                  id="input"
                  onUserInput={() => null}
                  // label={
                  //   independentField === Field.OUTPUT && !showWrap ? (
                  //     <Trans>From (at most)</Trans>
                  //   ) : (
                  //     <Trans>From</Trans>
                  //   )
                  // }
                  // value={formattedAmounts[Field.INPUT]}
                  // showMaxButton={showMaxButton}
                  // currency={currencies[Field.INPUT]}
                  // onUserInput={handleTypeInput}
                  // onMax={handleMaxInput}
                  // fiatValue={fiatValueInput ?? undefined}
                  // onCurrencySelect={handleInputSelect}
                  // otherCurrency={currencies[Field.OUTPUT]}
                  // showCommonBases={true}
                  // id="swap-currency-input"
                  // loading={independentField === Field.OUTPUT && routeIsSyncing}
                />

                <CurrencyInput
                  value=""
                  id="output"
                  onUserInput={() => null}
                  style={{
                    marginTop: 32,
                  }}
                  // value={formattedAmounts[Field.OUTPUT]}
                  // onUserInput={handleTypeOutput}
                  // label={
                  //   independentField === Field.INPUT && !showWrap ? (
                  //     <Trans>To (at least)</Trans>
                  //   ) : (
                  //     <Trans>To</Trans>
                  //   )
                  // }
                  // showMaxButton={false}
                  // hideBalance={false}
                  // fiatValue={fiatValueOutput ?? undefined}
                  // priceImpact={priceImpact}
                  // currency={currencies[Field.OUTPUT]}
                  // onCurrencySelect={handleOutputSelect}
                  // otherCurrency={currencies[Field.INPUT]}
                  // showCommonBases={true}
                  // id="swap-currency-output"
                  // loading={independentField === Field.INPUT && routeIsSyncing}
                />
              </div>

              {/* {recipient !== null && !showWrap ? (
              <>
                <AutoRow justify="space-between" style={{ padding: '0 1rem' }}>
                  <ArrowWrapper clickable={false}>
                    <ArrowDown size="16" color={theme.text2} />
                  </ArrowWrapper>
                  <LinkStyledButton id="remove-recipient-button" onClick={() => onChangeRecipient(null)}>
                    <Trans>- Remove recipient</Trans>
                  </LinkStyledButton>
                </AutoRow>
                <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
              </>
            ) : null}
            {!showWrap && userHasSpecifiedInputOutput && (trade || routeIsLoading || routeIsSyncing) && (
              <SwapDetailsDropdown
                trade={trade}
                syncing={routeIsSyncing}
                loading={routeIsLoading}
                showInverted={showInverted}
                setShowInverted={setShowInverted}
                allowedSlippage={allowedSlippage}
              />
            )} */}
              <div>
                {/* {swapIsUnsupported ? (
                <ButtonPrimary disabled={true}>
                  <ThemedText.Main mb="4px">
                    <Trans>Unsupported Asset</Trans>
                  </ThemedText.Main>
                </ButtonPrimary>
              ) : !account ? (
                <ButtonLight onClick={toggleWalletModal}>
                  <Trans>Connect Wallet</Trans>
                </ButtonLight>
              ) : showWrap ? (
                <ButtonPrimary disabled={Boolean(wrapInputError)} onClick={onWrap}>
                  {wrapInputError ? (
                    <WrapErrorText wrapInputError={wrapInputError} />
                  ) : wrapType === WrapType.WRAP ? (
                    <Trans>Wrap</Trans>
                  ) : wrapType === WrapType.UNWRAP ? (
                    <Trans>Unwrap</Trans>
                  ) : null}
                </ButtonPrimary>
              ) : routeNotFound && userHasSpecifiedInputOutput && !routeIsLoading && !routeIsSyncing ? (
                <GreyCard style={{ textAlign: 'center' }}>
                  <ThemedText.Main mb="4px">
                    <Trans>Insufficient liquidity for this trade.</Trans>
                  </ThemedText.Main>
                </GreyCard>
              ) : showApproveFlow ? (
                <AutoRow style={{ flexWrap: 'nowrap', width: '100%' }}>
                  <AutoColumn style={{ width: '100%' }} gap="12px">
                    <ButtonConfirmed
                      onClick={handleApprove}
                      disabled={
                        approvalState !== ApprovalState.NOT_APPROVED ||
                        approvalSubmitted ||
                        signatureState === UseERC20PermitState.SIGNED
                      }
                      width="100%"
                      altDisabledStyle={approvalState === ApprovalState.PENDING} // show solid button while waiting
                      confirmed={
                        approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED
                      }
                    >
                      <AutoRow justify="space-between" style={{ flexWrap: 'nowrap' }}>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <CurrencyLogo
                            currency={currencies[Field.INPUT]}
                            size={'20px'}
                            style={{ marginRight: '8px', flexShrink: 0 }}
                          />
                          we need to shorten this string on mobile
                          {approvalState === ApprovalState.APPROVED || signatureState === UseERC20PermitState.SIGNED ? (
                            <Trans>You can now trade {currencies[Field.INPUT]?.symbol}</Trans>
                          ) : (
                            <Trans>Allow the Uniswap Protocol to use your {currencies[Field.INPUT]?.symbol}</Trans>
                          )}
                        </span>
                        {approvalState === ApprovalState.PENDING ? (
                          <Loader stroke="white" />
                        ) : (approvalSubmitted && approvalState === ApprovalState.APPROVED) ||
                          signatureState === UseERC20PermitState.SIGNED ? (
                          <CheckCircle size="20" color={theme.green1} />
                        ) : (
                          <MouseoverTooltip
                            text={
                              <Trans>
                                You must give the Uniswap smart contracts permission to use your{' '}
                                {currencies[Field.INPUT]?.symbol}. You only have to do this once per token.
                              </Trans>
                            }
                          >
                            <HelpCircle size="20" color={'white'} style={{ marginLeft: '8px' }} />
                          </MouseoverTooltip>
                        )}
                      </AutoRow>
                    </ButtonConfirmed>
                    <ButtonError
                      onClick={() => {
                        if (isExpertMode) {
                          handleSwap()
                        } else {
                          setSwapState({
                            tradeToConfirm: trade,
                            attemptingTxn: false,
                            swapErrorMessage: undefined,
                            showConfirm: true,
                            txHash: undefined,
                          })
                        }
                      }}
                      width="100%"
                      id="swap-button"
                      disabled={
                        !isValid ||
                        routeIsSyncing ||
                        routeIsLoading ||
                        (approvalState !== ApprovalState.APPROVED && signatureState !== UseERC20PermitState.SIGNED) ||
                        priceImpactTooHigh
                      }
                      error={isValid && priceImpactSeverity > 2}
                    >
                      <Text fontSize={16} fontWeight={500}>
                        {priceImpactTooHigh ? (
                          <Trans>High Price Impact</Trans>
                        ) : trade && priceImpactSeverity > 2 ? (
                          <Trans>Swap Anyway</Trans>
                        ) : (
                          <Trans>Swap</Trans>
                        )}
                      </Text>
                    </ButtonError>
                  </AutoColumn>
                </AutoRow>
              ) : (
                <ButtonError
                  onClick={() => {
                    if (isExpertMode) {
                      handleSwap()
                    } else {
                      setSwapState({
                        tradeToConfirm: trade,
                        attemptingTxn: false,
                        swapErrorMessage: undefined,
                        showConfirm: true,
                        txHash: undefined,
                      })
                    }
                  }}
                  id="swap-button"
                  disabled={!isValid || routeIsSyncing || routeIsLoading || priceImpactTooHigh || !!swapCallbackError}
                  error={isValid && priceImpactSeverity > 2 && !swapCallbackError}
                >
                  <Text fontSize={20} fontWeight={500}>
                    {swapInputError ? (
                      swapInputError
                    ) : routeIsSyncing || routeIsLoading ? (
                      <Trans>Swap</Trans>
                    ) : priceImpactSeverity > 2 ? (
                      <Trans>Swap Anyway</Trans>
                    ) : priceImpactTooHigh ? (
                      <Trans>Price Impact Too High</Trans>
                    ) : (
                      <Trans>Swap</Trans>
                    )}
                  </Text>
                </ButtonError>
              )} */}
                {/* {isExpertMode && swapErrorMessage ? <SwapCallbackError error={swapErrorMessage} /> : null} */}
              </div>
            </AutoColumn>
          </SwapBody>
          <Button
            size="large"
            style={{
              margin: '0px 32px 0px 32px',
              width: 'calc(100% - 64px)',
              transform: 'translate(0, 50%)',
              zIndex: 2,
            }}
            onClick={() => null}
          >
            Swap
          </Button>
        </Box>
      </Content>
    </SwapWrapper>
  );
}
