import React from 'react';
import styles from './Block.module.scss';
import cx from 'classnames';

const Button = (props) => {
  const {
    item: { id, title, content },
    isSelected,
    setSelect,
  } = props;
  console.log(title);
  const classNames = cx(styles.button, {
    [styles.button__selected]: isSelected,
  });
  const handleSelect = () => {
    setSelect(id);
  };
  return (
    <div className={classNames} onClick={handleSelect}>
      <div className={styles.title}>
        <strong>{title}</strong>
      </div>
      <p>{content}</p>
    </div>
  );
};

Button.defaultProps = {
  item: {
    title: 'yes',
    content: 'Lorem ipsum',
  },
  isSelected: false,
};

export default Button;
