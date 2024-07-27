import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';
import { fetchUpdateContest } from '../../api/rest/restController';
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';

const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';

const initialState = {
  isFetching: true,
  error: null,
};

export const updateContest = createAsyncThunk(
  CONTEST_UPDATION_SLICE_NAME,
  async (payload, { dispatch }) => {
    const { data } = await fetchUpdateContest(payload);
    dispatch(updateStoreAfterUpdateContest(data));
  }
);

const reducers = {
  clearContestUpdationStore: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
};

const contestUpdationSlice = createSlice({
  name: CONTEST_UPDATION_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestUpdationSlice;

export const { clearContestUpdationStore } = actions;

export default reducer;
