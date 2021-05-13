import React from 'react'

export default function Category(props) {
  const {category} = props
  return (
    <div className="category">
      {category}
    </div>
  )
}