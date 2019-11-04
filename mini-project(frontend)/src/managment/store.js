import {createStore, applyMiddleware} from "redux";
import {logger} from "redux-logger";
import reducer from "./Reducers/index";
export const store=createStore(reducer,applyMiddleware(logger));