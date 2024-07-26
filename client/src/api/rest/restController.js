import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.post('getUser');
export const updateContest = data => http.post('updateContest', data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const fetchSetOfferStatus = data => http.post('setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`downloadFile/${data.fileName}`);
export const payMent = data => http.post('pay', data.formData);
export const fetchChangeMark = data => http.post('changeMark', data);
export const fetchGetPreviewChat = () => http.post('getPreview');
export const getDialog = data => http.post('getChat', data);
export const dataForContest = data => http.post('dataForContest', data);
export const cashOut = data => http.post('cashout', data);
export const updateUser = data =>
  http.post('updateUser', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const newMessage = data => {
  return http.post('newMessage', data);
};
export const fetchChangeChatFavorite = data => http.post('favorite', data);
export const fetchChangeChatBlock = data => http.post('blackList', data);
export const fetchGetCatalogList = data => http.post('getCatalogs', data);
export const fetchAddChatToCatalog = data =>
  http.post('addNewChatToCatalog', data);
export const fetchCreateCatalog = data => http.post('createCatalog', data);
export const fetchDeleteCatalog = data => http.post('deleteCatalog', data);
export const fetchRemoveChatFromCatalog = data =>
  http.post('removeChatFromCatalog', data);
export const fetchChangeCatalogName = data =>
  http.post('updateNameCatalog', data);
export const getCustomersContests = data =>
  http.post(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const fetchGetContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
