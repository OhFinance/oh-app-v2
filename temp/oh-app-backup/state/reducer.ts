import { StateContext } from "./state"

export enum ActionType {
  UPDATE_USER = 'Update User',
  SIGN_OUT = 'Sign out',
  UI_CHANGE = 'UI Change',
  UPDATE_BALANCES = 'Update Balances',
  RESET_BALANCES = 'Reset Balances',
  LOAD_TOKENS = 'Load Tokens',
}

export type Action =
  // | { type: ActionType.UPDATE_USER; payload: User }
  | { type: ActionType.SIGN_OUT; payload?: any }
  // | { type: ActionType.UI_CHANGE; payload: UIProps }
  // | { type: ActionType.LOAD_TOKENS; payload: TokenInfo[] }
  // | { type: ActionType.UPDATE_BALANCES; payload: Balance[] }
  | { type: ActionType.RESET_BALANCES; payload?: any }

export const reducer = (state: StateContext, action: Action) => {
  switch (action.type) {
    // case ActionType.UPDATE_BALANCES:
    //   const balances = state.balances
    //   action.payload.forEach(a => {
    //     balances.set(a.info.symbol, a)
    //   })
    //   return { ...state, balances }

    case ActionType.RESET_BALANCES:
      return { ...state, balances: new Map() }

    // case ActionType.LOAD_TOKENS:
    //   return { ...state, tokens: action.payload }

    // case ActionType.UPDATE_USER:
    //   return { ...state, isAuthenticated: true, user: action.payload }

    default:
      throw new Error('Not among actions')
  }
}