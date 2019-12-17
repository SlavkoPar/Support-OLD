import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons'

import { IComponentProps } from '../types'

import { IQuestion } from '../types';

import { AutoSuggest } from '../../components/AutoSuggest';
import { Form } from './Form'


const QuestionsPage: React.FC<IComponentProps> = (props: IComponentProps) => {
	 const { questionGroups, question, questionAnswers, formMode, formModeGroup, onSelectQuestion, add, edit, remove, cancel, saveForm, canEdit } = props;

    return (
      <div className="name-container">

			<div className="two-columns">
				<div className="a">
					<AutoSuggest questionGroups={questionGroups} onSelectQuestion={onSelectQuestion}/>
				</div>
				<div className="b">
					
				</div>
			</div>

			<hr />

			<h4 style={{textAlign: 'center'}}>Maintenance (visible only for Admins) </h4>
			<div className="two-columns">
				<div className="a">
					<h3>All Questions by sections</h3>
					{questionGroups &&
						questionGroups.map(questionGroup => {
							return (
								<div key={questionGroup.groupId} style={{ paddingBottom: '5px'}}>
									<div>{questionGroup.title}</div>
									<div>
										{questionGroup.questions.map(question => 
											<div key={question.questionId} className="name">
												<button 
													className="question-button"
													onClick={() => onSelectQuestion(question.questionId)}>
													{question.text}
												</button>
												<button className="button-edit" title="Add a new Answer" onClick={() => edit(question.groupId, question.questionId)}>
													<FontAwesomeIcon icon={faEdit} color='lightblue' />
												</button>
												<button className="button-remove" title="Remove Answer" onClick={() => remove(question.groupId, question.questionId)}>
													<FontAwesomeIcon icon={faWindowClose}  color='lightblue' />
												</button>
											</div>
										)}
										<div style={{marginLeft: '5%'}}>
											<button className="button-add" title="Add a new Question" onClick={() => add(questionGroup.groupId)}>
												Add a new Question
											</button>
										</div>
									</div>
								</div>
							);
					})}
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

export default QuestionsPage

