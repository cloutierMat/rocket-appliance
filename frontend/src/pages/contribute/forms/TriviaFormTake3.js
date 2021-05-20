import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { v1 as id } from "uuid";

export default function TriviaFormTake3() {
	const [data, setData] = useState([]);
	const { register, getValues, watch, handleSubmit, control } = useForm();
	const at = watch("at", 2);

	const handleInsertAnswer = () => {
		setData([...data, { id: id() }]);
	};

	const remove = index => {
		setData([...data.slice(0, index), ...data.slice(index + 1)]);
	};

	const onSubmit = data => console.log(data);


	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<h1>Field Array </h1>
			<ul>
				{data.map((item, index) => (
					<li key={item.id}>
						<Controller
							as={<input />}
							name={`field${item.id}`}
							control={control}
							defaultValue="Enter options"
						/>
						<button onClick={() => remove(index)}>Delete</button>
					</li>
				))}
			</ul>
			<section>
				<button type="button" onClick={handleInsertAnswer}>
					New answer
        </button>
			</section>

			<input type="submit" />
		</form>
	);
}