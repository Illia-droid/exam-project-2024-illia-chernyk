import React, { useState } from "react";
import data from "./data.json";
import QuestionsBlock from "./QuestionsBlock";
import styles from "./FrequentlyAskedQuestions.module.css";
import Tab from "./Tab";
const defaulTab = "Launching A Contest";
const FrequentlyAskedQuestions = () => {
  const [titleSelectTab, setTitleSelectTab] = useState(defaulTab);
  const setSelectTab = (title) => {
    setTitleSelectTab(title);
  };
  const renderQuestionsBlocks = (block, i) => (
    <QuestionsBlock key={i} block={block} />
  );
  const renderTabs = (tab, i) => (
    <Tab
      key={i}
      tab={tab}
      isSelectTab={tab.title === titleSelectTab}
      setSelectTab={setSelectTab}
    />
  );
  return (
    <article className={styles.faqContainer}>
      <h3 className={styles.header}>Frequently Asked Questions</h3>
      <section className={styles.faqTabs}>{data.map(renderTabs)}</section>
      <section >
        {data.map(renderQuestionsBlocks)}
      </section>
    </article>
  );
};

export default FrequentlyAskedQuestions;
