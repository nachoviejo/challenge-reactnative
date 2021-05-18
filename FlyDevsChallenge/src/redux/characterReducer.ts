import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import {RootState} from './rootReducer';

//Chapter slice: Manage characters state. It's not used in this project but maybe its used in the future

//Character's image structure
export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  epidose: string[];
  url: string;
  created: string;
}

//Normalized character's storage structure interface
interface NormalizedCharacter {
  byId: {[id: number]: ICharacter};
  allIds: number[];
}

const initialState: NormalizedCharacter = {
  byId: {},
  allIds: [],
};

//Actions for the request
const getCharacterRequest = createAction('getCharacterRequest');
const getCharacterFailure = createAction('getCharacterFailure');

const characterImageSlice = createSlice({
  name: 'charactersImages',
  initialState,
  reducers: {
    getCharacterSuccess(state, action: PayloadAction<ICharacter>) {
      const character = action.payload;
      state.byId = {...state.byId, [character.id]: character};
      state.allIds = [...state.allIds, character.id];
    },
  },
});

export const {getCharacterSuccess} = characterImageSlice.actions;

export default characterImageSlice.reducer;

export const fetchCharacter =
  (characterEndPoint: string) => async (dispatch: any) => {
    dispatch(getCharacterRequest);
    try {
      const response: AxiosResponse<ICharacter> = await Axios.get(
        characterEndPoint,
      );
      dispatch(getCharacterSuccess(response.data));
    } catch (error) {
      console.error('Could not get character.', error.message);
      dispatch(getCharacterFailure());
    }
  };

export const randomCharacterSelector = () =>
  createSelector(
    (state: RootState) => state.characters,
    characters =>
      characters.byId[
        Math.floor(Math.random() * Object.keys(characters.byId).length)
      ],
  );
