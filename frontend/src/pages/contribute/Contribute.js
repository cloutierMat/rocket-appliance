import React from 'react'
import ContributeForm from './ContributeForm'
import ContributeDescription from './ContributeDescription'


export default function Contribute(props) {
  const { setPagePointer } = props;
  return (
    <div>
    <ContributeDescription/>
    <ContributeForm/>
    </div>
    )
}