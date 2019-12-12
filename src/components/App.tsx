import * as React from 'react';
import '../App.css';

import QuestionList from '../containers/QuestionList';

const App: React.SFC<{}> = () => {
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Questions &amp; Answers</h2>
      <QuestionList />
    </>
  );
};

export default App;