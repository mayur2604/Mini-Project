import {createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import reducer from "./reducer";
export const store3=createStore(reducer,applyMiddleware(logger));