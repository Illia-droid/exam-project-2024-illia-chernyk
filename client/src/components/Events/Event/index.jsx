import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import styles from './Event.module.css';
import { deleteEvent, setIsExpired } from '../../../store/slices/eventsSlice';

const Event = ({
  event: { id, body, isExpired, deadline, createdAt, userHours },
}) => {
  const [difference, setDifference] = useState(
    moment(deadline).diff(moment(), 'seconds')
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (difference <= 0) {
      clearInterval(timerInterval);
    }
    if (!isExpired && difference <= userHours * 3600) {
      dispatch(setIsExpired({ id }));
    }
    const timerInterval = setInterval(() => {
      setDifference((prevDifference) => prevDifference - 1);
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  }, [id, dispatch, isExpired, userHours, difference]);

  const deadlineDifference = moment(deadline).diff(
    moment(createdAt),
    'seconds'
  );
  const positionPercentage =
    difference > 0 ? (difference / deadlineDifference) * 100 : '0';

  const handleDelete = () => dispatch(deleteEvent({ id }));

  const formatSeconds = (seconds) => {
    let days = Math.floor(seconds / (3600 * 24));
    let hours = Math.floor((seconds % (3600 * 24)) / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    let formattedTime = '';

    if (days > 0) {
      formattedTime += days + 'd ';
    }
    if (hours > 0) {
      formattedTime += hours + 'h ';
    }
    if (minutes > 0) {
      formattedTime += minutes + 'm ';
    }
    if (remainingSeconds > 0) {
      formattedTime += remainingSeconds + 's';
    }

    return formattedTime;
  };

  return (
    <li className={styles.event}>
      <div
        className={styles.timer}
        style={{ left: `${positionPercentage}%` }}
      ></div>

      <p className={styles.eventName}>{body}</p>
      <div className={styles.time}>
        <span className={styles.time}>{formatSeconds(difference) || 'complete!'}</span>
        <button className={styles.butt} onClick={handleDelete}>
          <img src="/trash-can-svgrepo-com.svg" alt="frewfer" width="40px"/>
        </button>
      </div>
    </li>
  );
};

export default Event;
