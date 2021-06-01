import {createReducer, createSelector} from '@reduxjs/toolkit';
import {RootState} from './rootReducer';

//Loading reducer: Manage loadings. Centralize all the loadings flags used in the project.
interface loadingState {
  getChaptersRequest: boolean;
  getCharacterRequest: boolean;
}

const initialState: loadingState = {
  getChaptersRequest: false,
  getCharacterRequest: false,
};

const loadingReducer = createReducer(initialState, builder => {
  return builder.addDefaultCase((state: {[index: string]: boolean}, action) => {
    const {type} = action;
    const matches = /(.*)\/(.*)(Request|Success|Failure)/.exec(type);

    if (matches) {
      const [, , requestName, requestState] = matches;
      state[requestName] = requestState === 'Request';
    }
  });
});

export default loadingReducer;

export const loadingSelector = (actions: string[]) => {
  return createSelector(
    (state: RootState) => state.loading,
    (loading: {[index: string]: any}) => {
      const isLoading = actions.reduce(
        (accumulator, action) => (accumulator ? true : loading[action]),
        false,
      );
      return isLoading;
    },
  );
};
