import * as React from 'react';
import '../App.css';

import QuestionList from '../Questions/containers/QuestionList';


// type TParams = { id: string };

// function Product({ match }: RouteComponentProps<TParams>) {
//   return <h2>This is a page for product with ID: {match.params.id} </h2>;
// }

const App: React.SFC<{}> = () => {
  return (
    <>
      <h2 style={{textAlign: 'center'}}>Questions &amp; Answers</h2>
      <QuestionList canEdit={false} />
    </>
  );
};

export default App;