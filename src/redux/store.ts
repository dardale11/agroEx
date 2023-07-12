import {configureStore, combineReducers} from '@reduxjs/toolkit';
import itemsSlice from './reducers/itemsSlice';

export const rootReducer = combineReducers({
  items: itemsSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
