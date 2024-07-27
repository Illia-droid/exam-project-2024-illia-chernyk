import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetUser, fetchUpdateUser } from '../../api/rest/restController';
import { controller } from '../../api/ws/socketController';
import { pendingReducer, rejectedReducer } from '../../utils/store';
import { changeEditModeOnUserProfile } from './userProfileSlice';

const USER_SLICE_NAME = 'user';

const initialState = {
  isFetching: false,
  error: null,
  data: null,
};

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async (replace, { rejectWithValue }) => {
    try {
      const { data } = await fetchGetUser();
      controller.subscribe(data.id);
      if (replace) {
        replace('/');
      }
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await fetchUpdateUser(payload);
      dispatch(changeEditModeOnUserProfile(false));
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const reducers = {
  clearUserStore: state => {
    state.error = null;
    state.data = null;
  },
  clearUserError: state => {
    state.error = null;
  },
};

const extraReducers = builder => {
  builder.addCase(getUser.pending, pendingReducer);
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.data = payload;
  });
  builder.addCase(getUser.rejected, rejectedReducer);

  builder.addCase(updateUser.pending, pendingReducer);
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.data = { ...state.data, ...payload };
  });
  builder.addCase(updateUser.rejected, rejectedReducer);
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userSlice;

export const { clearUserStore, clearUserError } = actions;

export default reducer;
