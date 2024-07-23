import React from "react";
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import HowDoesAtomWork from "../../components/atomComponents/HowDoesAtomWork";
import WaysToUseAtom from "../../components/atomComponents/WaysToUseAtom";
import HowDoNamingContestWork from "../../components/atomComponents/HowDoNamingContestWork";
import FrequentlyAskedQuestions from "../../components/atomComponents/FrequentlyAskedQuestions";
import SearchBlock from "../../components/atomComponents/SearchBlock";
import BottomBlock from "../../components/atomComponents/BottomBlock";

const HowItWorksPage = () => {
  return (
    <main>
      <Header />
      <HowDoesAtomWork />
      <WaysToUseAtom />
      <HowDoNamingContestWork />
      <FrequentlyAskedQuestions />
      <SearchBlock />
      <Footer />
      <BottomBlock />
    </main>
  );
};

export default HowItWorksPage;
