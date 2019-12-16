import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IQuestion } from '../reducer';
import { IAnswer } from '../../Answers/reducer';

import QuestionAnswers from './QuestionAnswers'

interface IProps {
	question: IQuestion;
	questionAnswers: IAnswer[];
 }

export const QuestionForm: React.FC<IProps> = (props: IProps) => {
  const formik = useFormik({
	 enableReinitialize: true,
    initialValues: {
      text: props.question.text,
      answers: props.question.answers,
      email: '',
    },
    validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      answers: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="text"></label>
      <input
        id="text"
        name="text"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.text}
		  disabled
      />
      {formik.touched.text && formik.errors.text ? (
        <div>{formik.errors.text}</div>
      ) : null}
		
		<br />
		<QuestionAnswers question={props.question} questionAnswers={props.questionAnswers} canEdit={true} />

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
    </form>
  );
};