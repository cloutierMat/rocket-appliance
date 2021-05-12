import React from "react";

export default function NavButton(props) {
    const { name } = props
    return (
        <button className="nav-button"><span> { name } </span></button>
    )
}