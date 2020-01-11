import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IAnswer } from '../types';
import { COLORS } from '../../formik/theme';


interface IProps {
	answer: IAnswer;
	formMode: string;
	options?: string[],
	cancel: () => void;
	saveForm: (answer: IAnswer, formMode: string) => void;
 }

const Form: React.FC<IProps> = (props: IProps) => {
  const formik = useFormik({
	enableReinitialize: true,
   initialValues: {
		fromMode: props.formMode,
      answerId: props.answer.answerId,
		text: props.answer.text,
		options: props.answer.options
   },
   validationSchema: Yup.object({
      text: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
   }),
   onSubmit: (values) => {
		// alert(JSON.stringify(values, null, 2));
		props.saveForm(values, props.formMode)
   },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		 { props.formMode !== 'add' && 
		 <>
			<label htmlFor="answerId"></label>
			<input
			id="answerId"
			name="answerId"
			type="text"
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.answerId}
			disabled
			style={{width: '50px'}}
			/>
			{formik.touched.answerId && formik.errors.answerId ? (
			<div>{formik.errors.answerId}</div>
			) : null}
			</>
		}

      <label htmlFor="text"></label>
      <input
        id="text"
        name="text"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.text}
      />
      {formik.touched.text && formik.errors.text ? (
        <div>{formik.errors.text}</div>
      ) : null}
		
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

		<button onClick={() => props.cancel()}>Cancel</button>
      <button type="submit">Save</button>
    </form>
  );
};

const color = 'blue';

export const AnswerForm: React.FC<IProps> = (props: IProps) => {
	return (
		<div style={{ height: '100%' }} className="formik-example formik-example--blue">
		<div
			style={{
			height: '100%',
			background: COLORS[color][5],
			padding: '4rem 2rem',
			}}
		>
			<div
			style={{
				borderRadius: '4px',
				boxShadow: '0 8px 16px rgba(0,0,0,.2)',
				background: '#fff',
				maxWidth: 400,
				margin: '0 auto',
				padding: '2rem',
			}}
			>
			<div className="formik-example formik-example--blue">
				<Form {...props} />
			</div>
			</div>
		</div>
		</div>	
	)
}