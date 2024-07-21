import React, { useRef, useEffect } from 'react';
import styles from './ContestsContainer.module.sass';
import Spinner from '../Spinner/Spinner';

const ContestsContainer = (props) => {
  const { isFetching, children, loadMore, haveMore } = props;
  const observerRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && haveMore && !isFetching) {
          loadMore(children.length);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [children.length, haveMore, isFetching, loadMore]);

  if (!isFetching && children.length === 0) {
    return <div className={styles.notFound}>Nothing found</div>;
  }

  return (
    <div>
      {children}
      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      <div ref={observerRef} className={styles.observer}></div>
    </div>
  );
};

export default ContestsContainer;
