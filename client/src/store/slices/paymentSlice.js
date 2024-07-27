import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {payMent,fetchCashOut} from '../../api/rest/restController';
import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';
import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';

const PAYMENT_SLICE_NAME = 'payment';

const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

export const pay = createAsyncThunk(
  `${PAYMENT_SLICE_NAME}/pay`,
  async ({ data, history }, { dispatch }) => {
    await payMent(data);
    history.replace('dashboard');
    dispatch(clearContestStore());
  }
);

export const cashOut = createAsyncThunk(
  `${PAYMENT_SLICE_NAME}/cashOut`,
  async (payload, { dispatch }) => {
    const { data } = await fetchCashOut(payload);
    dispatch(updateUser.fulfilled(data));
    dispatch(changeProfileViewMode(CONSTANTS.USER_INFO_MODE));
  }
);

const reducers = {
  changeFocusOnCard: (state, { payload }) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};

const paymentSlice = createSlice({
  name: PAYMENT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = paymentSlice;

export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
