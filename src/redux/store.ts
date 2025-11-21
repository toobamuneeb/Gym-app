import MMKVStorage from './MMKVStorage';
import {rootReducer} from '../redux/reducers/index';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {userAuth} from './Api/auth.api';
import {chat} from './Api/chat.api';
import {message} from './Api/message.api';
import {trainers} from './Api/trainer.api';
import {client} from './Api/client.api';
import {plan} from './Api/plan.api';
import {rating} from './Api/rating.api';
import { trackers } from './Api/trackers.api';
const persistConfig = {
  key: 'root',
  storage: MMKVStorage,
  whitelist: ['generalSlice'],
  timeout: undefined,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ['generalSlice.signup.dateOfBirth'],
      },
    }).concat(
      userAuth.middleware,
      chat.middleware,
      message.middleware,
      trainers.middleware,
      client.middleware,
      plan.middleware,
      rating.middleware,
      trackers.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

setupListeners(store.dispatch);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
