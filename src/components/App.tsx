import * as React from 'react';
import '../App.css';

import QuestionList from '../containers/QuestionList';

const App: React.SFC<{}> = () => {
  return (
    <>
      <h1>Questions &amp; Answers</h1>
      <QuestionList />
    </>
  );
};

export default App;