import React from 'react';
import { useStudent } from '../useStudent';

import { cancel, store, edit, remove } from '../actions'
import { MyForm } from './MyForm';

interface IProps {
}

export const StudentForm: React.FC<IProps> = (props: IProps) => {
	const { state, dispatch } = useStudent();
	const { entity: student, formMode, canEdit } = state;

	let title: string = ''
	switch (state.formMode) {
		case 'display':
			title = 'Student';
			break;
		case 'edit':
			title = 'Edit Student';
			break;
		case 'add':
			title = 'New Student';
			break;
		default:
			break;
	}

	return (
		<div className="formik-example formik-example--blue">
		{ student && 
			<div style={{border: '1px solid silver', borderRadius: '5px', padding: '10px'}}>
				<h4 style={{marginTop: 0}}>{title}</h4>
				<MyForm {...props}
					student={student!} 
					formMode={formMode}
					canEdit={canEdit}
					cancel = {() => dispatch(cancel())}
					saveForm = { (student) => dispatch(store(student))}
					edit = {() => dispatch(edit(student!.entityId))}
					remove = {() => dispatch(remove(student!.entityId))}
				/>
			</div>
		}
		</div>
	)
}