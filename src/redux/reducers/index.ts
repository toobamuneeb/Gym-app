import {combineReducers} from '@reduxjs/toolkit';
import {generalSlice} from './generalSlice';
import MMKVStorage from '../MMKVStorage';
import {userAuth} from '../Api/auth.api';
import {chat} from '../Api/chat.api';
import {message} from '../Api/message.api';
import {trainers} from '../Api/trainer.api';
import {client} from '../Api/client.api';
import {plan} from '../Api/plan.api';
import {rating} from '../Api/rating.api';
import {planSlice} from './planSlice';

const appReducer = combineReducers({
  generalSlice: generalSlice.reducer,
  [userAuth.reducerPath]: userAuth.reducer,
  [chat.reducerPath]: chat.reducer,
  [message.reducerPath]: message.reducer,
  [trainers.reducerPath]: trainers.reducer,
  [client.reducerPath]: client.reducer,
  [plan.reducerPath]: plan.reducer,
  [rating.reducerPath]: rating.reducer,
  planSlice: planSlice.reducer,
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'LOGOUT') {
    MMKVStorage.removeItem('persist:root');

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
