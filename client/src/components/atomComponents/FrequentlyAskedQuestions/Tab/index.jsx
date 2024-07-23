import React, { useState } from 'react';
import styles from './Tab.module.css';
import cx from 'classnames';
const Tab = ({ tab: { title }, isSelectTab, setSelectTab }) => {
  const handleTab = () => {
    setSelectTab(title);
  };
  const classNames = cx(styles.tab, { [styles.tabActive]: isSelectTab });
  return (
    <a href={`#${title}`} className={classNames} onClick={handleTab}>
      <span>{title}</span>
    </a>
  );
};

export default Tab;
