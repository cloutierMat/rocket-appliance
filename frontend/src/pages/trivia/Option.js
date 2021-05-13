import React from 'react'

export default function Option(props) {
  const {content} = props;
  return (
    <div className="trivia-option">
      {content}
    </div>
  )
}