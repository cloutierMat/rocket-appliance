import React from 'react';
import { useForm } from 'react-hook-form';

export default function Answers(props) {
	const { index } = props;
	const { register } = useForm();

	return (
		<div>
			Answer: <input defaultValue="option" {...register(`questions.option[${index}]`)} /><br />
		</div>
	);
}