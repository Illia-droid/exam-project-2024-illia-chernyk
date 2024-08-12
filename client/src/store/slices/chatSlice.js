import { createSlice } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import {
  fetchGetPreviewChat,
  getDialog,
  newMessage,
  fetchChangeChatFavorite,
  fetchChangeChatBlock,
  fetchGetCatalogList,
  fetchAddChatToCatalog,
  fetchCreateCatalog,
  fetchDeleteCatalog,
  fetchRemoveChatFromCatalog,
  fetchChangeCatalogName,
} from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk1,
  rejectedReducer,
  pendingReducer,
} from '../../utils/store';

const CHAT_SLICE_NAME = 'chat';

const initialState = {
  isFetching: true,
  error: null,
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  isExpanded: false,
  interlocutor: [],
  messagesPreview: [],
  isShow: false,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
};

export const getPreviewChat = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/getPreviewChat`,
  thunk: fetchGetPreviewChat,
});

export const getDialogMessages = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/getDialogMessages`,
  thunk: getDialog,
});

export const sendMessage = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/sendMessage`,
  thunk: newMessage,
});

export const changeChatFavorite = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/changeChatFavorite`,
  thunk: fetchChangeChatFavorite,
});

export const changeChatBlock = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/changeChatBlock`,
  thunk: fetchChangeChatBlock,
});

export const getCatalogList = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/getCatalogList`,
  thunk: fetchGetCatalogList,
});

export const addChatToCatalog = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/addChatToCatalog`,
  thunk: fetchAddChatToCatalog,
});

export const createCatalog = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/createCatalog`,
  thunk: fetchCreateCatalog,
});

export const deleteCatalog = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/deleteCatalog`,
  thunk: fetchDeleteCatalog,
});

export const removeChatFromCatalog = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/removeChatFromCatalog`,
  thunk: fetchRemoveChatFromCatalog,
});

export const changeCatalogName = decorateAsyncThunk1({
  key: `${CHAT_SLICE_NAME}/changeCatalogName`,
  thunk: fetchChangeCatalogName,
});

const reducers = {
  changeBlockStatusInStore: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.map(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
      preview.favoriteList = payload.favoriteList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },

  addMessage: (state, { payload }) => {
    const { message, preview } = payload;
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.map(preview => {
      if (isEqual(preview.participants, message.participants)) {
        preview.text = message.body;
        preview.sender = message.sender;
        preview.createAt = message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(preview);
    }
    state.messagesPreview = messagesPreview;
  },
  backToDialogList: state => {
    state.isExpanded = false;
  },
  goToExpandedDialog: (state, { payload }) => {
    state.interlocutor = { ...state.interlocutor, ...payload.interlocutor };
    state.chatData = payload.conversationData;
    state.isShow = true;
    state.isExpanded = true;
    state.messages = [];
  },
  clearMessageList: state => {
    state.messages = [];
  },
  changeChatShow: state => {
    state.isShowCatalogCreation = false;
    state.isShow = !state.isShow;
  },
  setPreviewChatMode: (state, { payload }) => {
    state.chatMode = payload;
  },
  changeShowModeCatalog: (state, { payload }) => {
    state.currentCatalog = { ...state.currentCatalog, ...payload };
    state.isShowChatsInCatalog = !state.isShowChatsInCatalog;
    state.isRenameCatalog = false;
  },
  changeTypeOfChatAdding: (state, { payload }) => {
    state.catalogCreationMode = payload;
  },
  changeShowAddChatToCatalogMenu: (state, { payload }) => {
    state.addChatId = payload;
    state.isShowCatalogCreation = !state.isShowCatalogCreation;
  },
  changeRenameCatalogMode: state => {
    state.isRenameCatalog = !state.isRenameCatalog;
  },
  clearChatError: state => {
    state.error = null;
  },
};

const extraReducers = builder => {
  //---------- getPreviewChat

  builder.addCase(getPreviewChat.pending, pendingReducer);
  builder.addCase(getPreviewChat.fulfilled, (state, { payload }) => {
    state.messagesPreview = payload;
    state.error = null;
  });
  builder.addCase(getPreviewChat.rejected, (state, { payload }) => {
    state.error = payload;
    state.messagesPreview = [];
  });

  //---------- getDialogMessages

  builder.addCase(getDialogMessages.pending, pendingReducer);
  builder.addCase(getDialogMessages.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.messages = payload.messages;
    state.interlocutor = payload.interlocutor;
  });
  builder.addCase(getDialogMessages.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.messages = [];
    state.interlocutor = null;
  });

  //---------- sendMessage

  builder.addCase(sendMessage.pending, pendingReducer);
  builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    const { message, preview } = payload;

    const existingPreviewIndex = messagesPreview.findIndex(preview =>
      isEqual(preview.participants, message.participants)
    );

    if (existingPreviewIndex !== -1) {
      messagesPreview[existingPreviewIndex] = {
        ...messagesPreview[existingPreviewIndex],
        text: message.body,
        sender: message.sender,
        createAt: message.createdAt,
      };
    } else {
      messagesPreview.push(preview);
    }

    state.chatData = {
      ...state.chatData,
      _id: preview._id,
      participants: preview.participants,
      favoriteList: preview.favoriteList,
      blackList: preview.blackList,
    };

    state.messagesPreview = messagesPreview;
    state.messages.push(message);
  });
  builder.addCase(sendMessage.rejected, rejectedReducer);

  //---------- changeChatFavorite

  builder.addCase(changeChatFavorite.pending, pendingReducer);
  builder.addCase(changeChatFavorite.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.map(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.favoriteList = payload.favoriteList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  });
  builder.addCase(changeChatFavorite.rejected, rejectedReducer);

  //---------- changeChatBlock

  builder.addCase(changeChatBlock.pending, pendingReducer);
  builder.addCase(changeChatBlock.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.map(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  });
  builder.addCase(changeChatBlock.rejected, rejectedReducer);

  //---------- getCatalogList

  builder.addCase(getCatalogList.pending, pendingReducer);
  builder.addCase(getCatalogList.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.catalogList = [...payload];
  });
  builder.addCase(getCatalogList.rejected, rejectedReducer);

  //---------- addChatToCatalog

  builder.addCase(addChatToCatalog.pending, pendingReducer);
  builder.addCase(addChatToCatalog.fulfilled, (state, { payload }) => {
    const index = state.catalogList.findIndex(item => item._id === payload._id);
    if (index !== -1) {
      state.catalogList[index].chats = payload.chats;
    }
    state.isShowCatalogCreation = false;
  });
  builder.addCase(addChatToCatalog.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.isShowCatalogCreation = false;
  });

  //---------- createCatalog

  builder.addCase(createCatalog.pending, pendingReducer);
  builder.addCase(createCatalog.fulfilled, (state, { payload }) => {
    state.catalogList = [...state.catalogList, payload];
    state.isShowCatalogCreation = false;
  });
  builder.addCase(createCatalog.rejected, (state, { payload }) => {
    state.isShowCatalogCreation = false;
    state.error = payload;
  });

  //---------- deleteCatalog

  builder.addCase(deleteCatalog.pending, pendingReducer);
  builder.addCase(deleteCatalog.fulfilled, (state, { payload }) => {
    const { catalogId } = payload;
    state.catalogList = state.catalogList.filter(
      catalog => catalogId !== catalog._id
    );
  });
  builder.addCase(deleteCatalog.rejected, rejectedReducer);

  //---------- removeChatFromCatalog

  builder.addCase(removeChatFromCatalog.pending, pendingReducer);
  builder.addCase(removeChatFromCatalog.fulfilled, (state, { payload }) => {
    const index = state.catalogList.findIndex(item => item._id === payload._id);
    if (index !== -1) {
      state.catalogList[index].chats = payload.chats;
    }
    state.currentCatalog = payload;
  });
  builder.addCase(removeChatFromCatalog.rejected, rejectedReducer);

  //---------- changeCatalogName

  builder.addCase(changeCatalogName.pending, pendingReducer);
  builder.addCase(changeCatalogName.fulfilled, (state, { payload }) => {
    const index = state.catalogList.findIndex(item => item._id === payload._id);
    if (index !== -1) {
      state.catalogList[index].catalogName = payload.catalogName;
    }
    state.currentCatalog = payload;
    state.isRenameCatalog = false;
  });
  builder.addCase(changeCatalogName.rejected, rejectedReducer);
};

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
const { actions, reducer } = chatSlice;
export const {
  changeBlockStatusInStore,
  addMessage,
  backToDialogList,
  goToExpandedDialog,
  clearMessageList,
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  changeRenameCatalogMode,
  clearChatError,
} = actions;
export default reducer;