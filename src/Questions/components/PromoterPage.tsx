import * as React from 'react';

import { IQuestion, IQuestionGroup, IComponentProps } from '../types';

import { IAnswer } from '../../Answers/reducer';

import { AutoSuggest } from '../../components/AutoSuggest';
import { Form } from './Form'


const PromoterPage: React.FC<IComponentProps> = (props: IComponentProps) => {
	 const { questionGroups, question, questionAnswers, formMode,  onSelectQuestion, add, edit, remove, cancel, saveForm, canEdit } = props;
	 
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
							/>

						</div>
					}
				</div>
			</div>
			
      </div>
    );
  }

export default PromoterPage

