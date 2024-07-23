import React from 'react';
import Events from '../../components/Events';
import EventForm from '../../components/Events/EventForm';
import Header from '../../components/Header/Header';
import styles from './EventsPage.module.scss';
const EventsPage = () => {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <EventForm />
        <Events />
      </main>
    </>
  );
};

export default EventsPage;
