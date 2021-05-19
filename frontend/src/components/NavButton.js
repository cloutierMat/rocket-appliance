import React from "react";

export default function NavButton(props) {
    const { name , setPagePointer} = props
    return (
        <button className={"nav-button " + name } onClick={() => {setPagePointer(name)}}><span> { name } </span></button>
    )
}