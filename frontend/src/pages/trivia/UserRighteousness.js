import React from 'react';

export default function UserRighteousness(props) {
	const { userRighteousness, onClick } = props;
	return (
		<div>
			{userRighteousness === "unanswered" && "Try clicking an answer!"}
			{userRighteousness === "wrong" && "Try again!"}
			{userRighteousness === "right" && <>
				You are right!
				<button onClick={onClick}>Next</button>
			</>}
		</div>
	);
}