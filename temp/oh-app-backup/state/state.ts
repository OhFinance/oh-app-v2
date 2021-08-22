import { Action } from "./reducer";

export interface StateContext {
  isAuthenticated: boolean
  // tokens: TokenInfo[]
  // user?: User
  // balances: Map<string, Balance>
  // ui: UIProps
}
export interface Store {
  state: StateContext
  dispatch: React.Dispatch<Action>
}

const defaultState: StateContext = {
  isAuthenticated: false,
  // balances: new Map(),
  // tokens: [],
  // ui: {
  //   loginModalVisible: false,
  //   confirmModalVisible: false,
  //   accountDetailsModalVisible: false,
  // },
}