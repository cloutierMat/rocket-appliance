import React from 'react';
import './trivia.css';


export default function UserRighteousness(props) {
	const { userRighteousness, onClick } = props;
	return (
		<div className="user-righteousness">
			{userRighteousness === "unanswered" && "Select an answer"}
			{userRighteousness === "wrong" && "Try again!"}
			{userRighteousness === "right" && < >
				You are right!
				<button onClick={onClick}>Next</button>
			</>}
		</div>
	);
}