import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import {
  fetchGetContestById,
  setNewOffer,
  fetchSetOfferStatus,
  fetchChangeMark,
} from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  pendingReducer,
} from '../../utils/store';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

const initialState = {
  isFetching: false,
  error: null,
  contestData: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

export const getContestById = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  async payload => {
    const { data } = await fetchGetContestById(payload);
    const { Offers } = data;
    delete data.Offers;
    return { contestData: data, offers: Offers };
  }
);

export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  thunk: setNewOffer,
});

export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  thunk: fetchSetOfferStatus,
});

export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  thunk: fetchChangeMark,
});

const reducers = {
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  clearAddOfferError: state => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: state => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: state => {
    state.changeMarkError = null;
  },
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};

const extraReducers = builder => {
  //---------- getContestById

  builder.addCase(getContestById.pending, pendingReducer);
  builder.addCase(getContestById.fulfilled, (state, { payload }) => {
    const { contestData, offers } = payload;
    state.isFetching = false;
    state.error = null;
    state.contestData = contestData;
    state.offers = offers;
  });
  builder.addCase(getContestById.rejected, rejectedReducer);
  //---------- addOffer

  builder.addCase(addOffer.pending, pendingReducer);
  builder.addCase(addOffer.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers.unshift(payload);
  });
  builder.addCase(addOffer.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.addOfferError = payload;
  });

  //---------- setOfferStatus

  builder.addCase(setOfferStatus.pending, pendingReducer);
  builder.addCase(setOfferStatus.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers.forEach(offer => {
      if (payload.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
          payload.id === offer.id
            ? CONSTANTS.OFFER_STATUS_WON
            : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (payload.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
  });
  builder.addCase(setOfferStatus.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.addOfferError = payload;
  });

  //---------- changeMark

  builder.addCase(changeMark.pending, pendingReducer);
  builder.addCase(
    changeMark.fulfilled,
    (state, { payload: { data, offerId, mark } }) => {
      state.isFetching = false;
      state.error = null;
      state.offers.forEach(offer => {
        if (offer.User.id === data.userId) {
          offer.User.rating = data.rating;
        }
        if (offer.id === offerId) {
          offer.mark = mark;
        }
      });
    }
  );
  builder.addCase(changeMark.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.changeMarkError = payload;
  });
};

const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;
