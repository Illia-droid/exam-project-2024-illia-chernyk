import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import {
  getDialogMessages,
  clearMessageList,
  backToDialogList,
} from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import styles from './Dialog.module.sass';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';

const Dialog = (props) => {
  // console.log(props.messages);
  useEffect(() => {
    if (!props.messages.length) {
      props.getDialog({ interlocutorId: props.interlocutor.id });
    }
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
    return () => {
      // if (props.messages.length) {
      //   props.clearMessageList();
      // }
      // props.backToDialogList();
    };
  }, [props.messages.length]);
  const messagesEnd = useRef(null);

  const renderMainDialog = () => {
    const messagesArray = [];
    console.log(props.messages);
    const { messages, userId } = props;
    const currentTime = moment();
    messages.map((message, i) => {
      // if (!currentTime.isSame(message.createdAt, 'date')) {
      //   messagesArray.push(
      //     <div key={message.createdAt} className={styles.date}>
      //       {moment(message.createdAt).format('MMMM DD, YYYY')}
      //     </div>
      //   );
      //   currentTime = moment(message.createdAt);
      // }
      messagesArray.push(
        <div
          key={i}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
          <div />
        </div>
      );
    });
    return (
      <div className={styles.messageList}>
        {messagesArray}
        <div ref={messagesEnd}></div>
      </div>
    );
  };

  const blockMessage = () => {
    const { userId, chatData } = props;
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;
    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };

  const { chatData, userId, isFetching } = props;
  return (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      {chatData && chatData.blackList.includes(true) ? (
        blockMessage()
      ) : (
        <ChatInput />
      )}
    </>
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  backToDialogList: () => dispatch(backToDialogList()),
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
