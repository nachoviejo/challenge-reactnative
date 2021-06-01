import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import chapterReducer from './chapterSlice';
import characterReducer from './characterReducer';
import loadingReducer from './loadingReducer';

// Configuration of redux persist
const rootPersistConfig = {
  // Key to be set in the AsyncStorage related to the info of the storage to persist
  key: 'root',
  // Default storage in which the redux store is gonna be store
  storage: AsyncStorage,
  // How many layers are gonna be merged when is conflict between new and old field names in the redux store
  stateReconciler: autoMergeLevel2,
  whitelist: ['user', 'tenants'],
};

const rootReducer = combineReducers({
  chapters: chapterReducer,
  characters: characterReducer,
  loading: loadingReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(rootPersistConfig, rootReducer);
