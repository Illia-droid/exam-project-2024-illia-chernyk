import React, { useState } from 'react';
import Button from './Button';

import styles from './ButtonsGroup.module.scss';

const ButtonsGroup = (props) => {
  const { idSelectedItem, content } = props;

  const [idSelectItem, setIdSelectItem] = useState(Number(idSelectedItem));
  const setSelect = (id) => {
    setIdSelectItem(id);
  };
  const renderBlocks = content.map((block) => {
    return (
      <Button
        key={block.id}
        item={block}
        setSelect={setSelect}
        isSelected={block.id === idSelectItem}
      />
    );
  });

  return <div className={styles.blocksGroup}>{renderBlocks}</div>;
};

export default ButtonsGroup;
