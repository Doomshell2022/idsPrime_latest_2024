import {combineReducers, applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// root reducer
import * as reducers from './data/index';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['userInfo'],
  stateReconciler: autoMergeLevel2,
  timeout: null,
};
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancer = compose(applyMiddleware(thunk)); // ascyrnous data --->
const store = createStore(persistedReducer, {}, enhancer);
const persister = persistStore(store, null);
export default function configureStore() {
  return {store, persister};
}
