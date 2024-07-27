import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import { loginRequest, registerRequest } from '../../api/rest/restController';
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';

const AUTH_SLICE_NAME = 'auth';

const initialState = {
  isFetching: false,
  error: null,
};

export const checkAuth = createAsyncThunk(
  `${AUTH_SLICE_NAME}/checkAuth`,
  async ({ data: authInfo, history, authMode }) => {
    authMode === CONSTANTS.AUTH_MODE.LOGIN
      ? await loginRequest(authInfo)
      : await registerRequest(authInfo);
    history.replace('/');
  }
);

const reducers = {
  clearAuthError: state => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(checkAuth.pending, pendingReducer);
  builder.addCase(checkAuth.fulfilled, fulfilledReducer);
  builder.addCase(checkAuth.rejected, rejectedReducer);
};

const authSlice = createSlice({
  name: `${AUTH_SLICE_NAME}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
