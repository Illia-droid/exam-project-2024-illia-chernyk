import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCustomersContests,
  getActiveContests,
} from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import { pendingReducer, rejectedReducer } from '../../utils/store';

const CONTESTS_SLICE_NAME = 'contests';

const initialState = {
  isFetching: false,
  error: null,
  contests: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

export const getContests = createAsyncThunk(
  `${CONTESTS_SLICE_NAME}/getContests`,
  async ({ requestData, role }) => {
    const { data } =
      role === CONSTANTS.CUSTOMER
        ? await getCustomersContests(requestData)
        : await getActiveContests(requestData);
    return data;
  }
);

const reducers = {
  clearContestsList: state => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = builder => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getContests.rejected, rejectedReducer);
};

const contestsSlice = createSlice({
  name: CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearContestsList, setNewCustomerFilter, setNewCreatorFilter } =
  actions;

export default reducer;
