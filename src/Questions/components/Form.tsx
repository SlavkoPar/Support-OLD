import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IQuestion } from '../types';
import { IAnswer } from '../../Answers/types';

import QuestionAnswers from './QuestionAnswers'

interface IProps {
	question: IQuestion;
	questionAnswers: IAnswer[];
	answers: IAnswer[];
	formMode: string;
	canEdit: boolean,
	cancel: () => void;
	saveForm: (question: IQuestion, formMode: string) => void;
	removeQuestionAnswer: (groupId: number, questionId: number, answerId: number) => void;
	assignQuestionAnswer: (groupId: number, questionId: number, answerId: number) => void; 	
 }

export const Form: React.FC<IProps> = (props: IProps) => {
  const formik = useFormik({
	 enableReinitialize: true,
    initialValues: {
		groupId: props.question.groupId,
		questionId: props.question.questionId,
      text: props.question.text,
      answers: props.question.answers
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      /*answers: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),*/
    }),
    onSubmit: values => {
		// alert(JSON.stringify(values, null, 2));
		props.saveForm(values, props.formMode)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>

		<label htmlFor="text"></label>
      <input
        id="questionId"
        name="questionId"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.questionId}
		  disabled
		  style={{width: '50px'}}
      />
      {formik.touched.questionId && formik.errors.questionId ? (
        <div>{formik.errors.questionId}</div>
      ) : null}

      <label htmlFor="text"></label>
      <input
        id="text"
        name="text"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.text}
		  multiple
      />
      {formik.touched.text && formik.errors.text ? (
        <div>{formik.errors.text}</div>
      ) : null}
		
		<br />
		<QuestionAnswers 
			question={props.question} 
			questionAnswers={props.questionAnswers}
			answers={props.answers}
			canEdit={props.canEdit}
			formMode={props.formMode}
			removeQuestionAnswer={props.removeQuestionAnswer}
			assignQuestionAnswer={props.assignQuestionAnswer}
		/>

		{/* 
      <label htmlFor="answers">Answers</label>
      <input
        id="answers"
        name="answers"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.answers}
      />
      {formik.touched.answers && formik.errors.answers ? (
        <div>{formik.errors.answers}</div>
      ) : null}



      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null} */}

      {/* <button type="submit">Submit</button> */}
		{ props.canEdit && 
			<button onClick={() => props.cancel()}>Cancel</button>}
		{ props.canEdit && 
      	<button type="submit">Save</button>}
    </form>
  );
};