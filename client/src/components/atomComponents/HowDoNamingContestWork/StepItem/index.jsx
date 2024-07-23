import React from "react";
import styles from "./StepItem.module.css";

const StepItem = ({ step: { span, content } }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles[span === "Step 4" ? 'item4' : "item"]}>
        <div className={styles.itemCap}>
          <span>{span}</span>
        </div>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default StepItem;
