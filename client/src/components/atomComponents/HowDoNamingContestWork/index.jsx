import React from "react";
import data from "./data.json";
import StepItem from "./StepItem";
import styles from "./HowDoNamingContestWork.module.css";
const HowDoNamingContestWork = () => {
  const renderSteps = (step, i) => <StepItem key={i} step={step} />;
  return (
    <section class={styles.homeBlock}>
      <div class={styles.container}>
        <div class={styles.homeBlockCaption}>
          <img class={styles.workImage} src="./icon-27.svg" alt="Cup" />
          <h3>How Do Naming Contests Work?</h3>
        </div>
        <div class={styles.flexBox}>{data.map(renderSteps)}</div>
      </div>
    </section>
  );
};

export default HowDoNamingContestWork;
