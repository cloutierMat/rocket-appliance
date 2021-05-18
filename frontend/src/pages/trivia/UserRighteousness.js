import React from 'react';

export default function UserRighteousness(props) {
  const {userRighteousness} = props;
  return (
    <div>
      {userRighteousness==="unanswered" && "Try clicking an answer!"}
      {userRighteousness==="wrong" && "Try again!"}
      {userRighteousness==="right" && <>
        You are right!
        <button>Next</button>
      </>}
    </div>
  )
}