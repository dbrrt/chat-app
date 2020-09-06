import {
    compose,
    combineReducers,
    createStore
  } from "redux";
import { create } from "redux-react-hook";
import * as reducers from "./reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// https://stackoverflow.com/questions/52800877/has-anyone-came-across-this-error-in-ts-with-redux-dev-tools-property-redux
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
  
export const { StoreContext, useDispatch, useMappedState } = create<
    any,
    any,
    any
>();
  
export const configureStore: any = (initialState: any = {}) => {
    const combinedReducers = combineReducers({
      ...reducers
    });
    const store = createStore(
      combinedReducers,
      initialState,
      composeEnhancers()
    );
    return store;
};
  
export const store = configureStore();
  