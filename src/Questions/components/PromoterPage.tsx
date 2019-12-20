import * as React from 'react';

import { IQuestion, IComponentProps } from '../types';


import { AutoSuggest } from '../../components/AutoSuggest';
import { Form } from './Form'


const PromoterPage: React.FC<IComponentProps> = (props: IComponentProps) => {
	 const { questionGroups, question, questionAnswers, formMode, onSelectQuestion, cancel, saveForm, canEdit,
		removeQuestionAnswer } = props;
	 
    return (
      <div className="name-container">

			<div className="two-columns">
				<div className="a">
					<AutoSuggest questionGroups={questionGroups} onSelectQuestion={onSelectQuestion}/>
				</div>
				<div className="b">
					{questionGroups && question &&
						<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
							<h4 style={{marginTop: 0}}>Question</h4>
							<Form 
								question={question}
								questionAnswers={questionAnswers}
								formMode={formMode}
								cancel={cancel}
								saveForm={(question: IQuestion) => saveForm(question, formMode)}
								canEdit={canEdit}
								removeQuestionAnswer={removeQuestionAnswer}
							/>

						</div>
					}
				</div>
			</div>
			
      </div>
    );
  }

export default PromoterPage

