import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IStudent } from '../types';

interface IFormProps {
	student: IStudent;
	formMode: string;
	canEdit: boolean;
	cancel: () => void;
	saveForm: (student: IStudent) => void;
	edit: () => void;
	remove: () => void;	
 }

export const MyForm: React.FC<IFormProps> = (props: IFormProps) => {
  const formik = useFormik({
	enableReinitialize: true,
   initialValues: {
		fromMode: props.formMode,
		canEdit: props.canEdit,
      entityId: props.student.entityId,
		url: props.student.url,
		firstName: props.student.firstName,
		lastName: props.student.lastName,
		name: props.student.name,
		email: props.student.email,
   },
   validationSchema: Yup.object({
      firstName: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
   }),
   onSubmit: (values) => {
		values.name = values.firstName.trim() + ' ' + values.lastName.trim()
		// alert(JSON.stringify(values, null, 2));
		props.saveForm(values)
   },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		 { props.formMode !== 'add' && 
		 <>
			<label htmlFor="entityId">Student id</label>
			<input
			id="entityId"
			name="entityId"
			type="text"
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.entityId}
			disabled
			style={{width: '50px'}}
			/>
			{formik.touched.entityId && formik.errors.entityId ? (
			<div>{formik.errors.entityId}</div>
			) : null}
			</>
		}

      <label htmlFor="firstName">First name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.firstName}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div>{formik.errors.firstName}</div>
      ) : null}

		<label htmlFor="lastName">Last name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.lastName}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div>{formik.errors.lastName}</div>
      ) : null}		

		<label htmlFor="lastName">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.email}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}		


		{ props.formMode !== 'display' &&
			<>
			<button onClick={() => props.cancel()}>Cancel</button>
      	<button type="submit">Save</button>
			</>
		}

		{ props.canEdit && props.formMode === 'display' &&
			<>
			<button onClick={() => props.edit()}>Edit</button>
			<button onClick={() => props.remove()}>Remove</button>
			</>
		}				

    </form>
  );
};

