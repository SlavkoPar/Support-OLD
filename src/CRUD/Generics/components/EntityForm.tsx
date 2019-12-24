import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { IEntity } from '../types';
import { useEntity } from '../useEntity';

import { cancel, store, edit, remove } from '../actions'

interface IFormProps {
	entity: IEntity;
	formMode: string;
	canEdit: boolean;
	cancel: () => void;
	saveForm: (entity: IEntity) => void;
	edit: () => void;
	remove: () => void;	
 }

const Form: React.FC<IFormProps> = (props: IFormProps) => {
  const formik = useFormik({
	enableReinitialize: true,
   initialValues: {
		fromMode: props.formMode,
		canEdit: props.canEdit,
      entityId: props.entity.entityId,
		name: props.entity.name,
		url: props.entity.url,
   },
   validationSchema: Yup.object({
      name: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
   }),
   onSubmit: (values) => {
		// alert(JSON.stringify(values, null, 2));
		props.saveForm(values)
   },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
		 { props.formMode !== 'add' && 
		 <>
			<label htmlFor="entityId"></label>
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

      <label htmlFor="text"></label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
		  value={formik.values.name}
		  disabled = {props.formMode === 'display'}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
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

interface IProps {
}

export const EntityForm: React.FC<IProps> = (props: IProps) => {
	const { state, dispatch } = useEntity();
	let title: string = ''
	switch (state.formMode) {
		case 'display':
			title = 'Entity';
			break;
		case 'edit':
			title = 'Edit Entity';
			break;
		case 'add':
			title = 'New Entity';
			break;
		default:
			break;
	}

	return (
		<div className="formik-example formik-example--blue">
		{ state.entity && 
			<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
				<h4 style={{marginTop: 0}}>{title}</h4>
				<Form {...props}
					entity={state.entity!} 
					formMode={state.formMode}
					canEdit={state.canEdit}
					cancel = {() => dispatch(cancel())}
					saveForm = { (entity) => dispatch(store(entity))}
					edit = {() => dispatch(edit(state.entity!.entityId))}
					remove = {() => dispatch(remove(state.entity!.entityId))}
				/>
			</div>
		}
		</div>
	)
}