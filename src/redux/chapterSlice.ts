import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import Axios, {AxiosResponse} from 'axios';
import {getChaptersEndPoint} from '../shared/utils/api';
import {RootState} from './rootReducer';
var _ = require('lodash');

//Chapter slice: Manage chapters state

//Chapter's structure
export interface IChapter {
  //The id of the episode.
  id: number;
  //The name of the episode.
  name: string;
  //The air date of the episode.
  air_date: string;
  //The code of the episode.
  episode: string;
  //List of characters who have been seen in the episode.
  characters: string[];
  //Link to the episode's own endpoint.
  url: string;
  //Time at which the episode was created in the database.
  created: string;
}

export interface Pagination {
  actual: number;
  max: number;
}

//Normalized chapter's storage structure interface
interface NormalizedChapter {
  byId: {[id: number]: IChapter};
  allIds: string[];
  pages: Pagination;
}

//Normalizr library result interface
const initialState: NormalizedChapter = {
  byId: {},
  allIds: [],
  pages: {
    actual: 0,
    max: 1,
  },
};

interface getCharacterSuccessPayload {
  chapters: IChapter[];
  pages: {
    actual: number;
    max: number;
  };
}

interface IChapterResponse {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: null;
  };
  results: IChapter[];
}

//Actions for the request
const getChaptersRequest = createAction('getChaptersRequest');
const getChaptersFailure = createAction('getChaptersFailure');

const chapterSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {
    getChaptersSuccess(
      state,
      action: PayloadAction<getCharacterSuccessPayload>,
    ) {
      const {chapters, pages} = action.payload;
      if (chapters) {
        if (chapters.length > 0) {
          const normalizeChapters = _.mapKeys(chapters, 'id');
          state.byId = {...state.byId, ...normalizeChapters};
          let chaptersIds: string[] = [];
          chapters.map(chapter => {
            chaptersIds.push(chapter.id.toString());
          });
          state.allIds = [...state.allIds, ...chaptersIds];
          state.pages = {
            actual: pages.actual,
            max: pages.max,
          };
        } else {
          state.byId = initialState.byId;
          state.allIds = initialState.allIds;
          state.pages = initialState.pages;
        }
      }
    },
    cleanChapters(state) {
      state.byId = initialState.byId;
      state.allIds = initialState.allIds;
      state.pages = initialState.pages;
    },
  },
});

export const {getChaptersSuccess, cleanChapters} = chapterSlice.actions;

export default chapterSlice.reducer;

export const fetchChapters =
  (actualPage: number, maxPage: number, name?: string) =>
  async (dispatch: any) => {
    dispatch(getChaptersRequest);
    let chapters: IChapter[] = [];
    if (actualPage < maxPage) {
      try {
        actualPage++;
        const response: AxiosResponse<IChapterResponse> = await Axios.get(
          getChaptersEndPoint({
            name,
            page: actualPage,
          }),
        );
        chapters = [...chapters, ...response?.data?.results];
        const maxPage = response.data.info.pages;
        dispatch(
          getChaptersSuccess({
            chapters,
            pages: {
              actual: actualPage,
              max: maxPage,
            },
          }),
        );
      } catch (error) {
        console.error('Could not get chapters.', error.message);
        dispatch(getChaptersFailure());
      }
    } else {
      console.info('All the pages have been fetched.');
    }
  };

export const paginationSelector = () =>
  createSelector(
    (state: RootState) => state.chapters,
    chapters => chapters.pages,
  );

export const chapterIdSelector = () =>
  createSelector(
    (state: RootState) => state.chapters,
    chapters => chapters.allIds,
  );

export const chapterSelector = (chapterId: number) =>
  createSelector(
    (state: RootState) => state.chapters,
    chapters => chapters.byId[chapterId],
  );
