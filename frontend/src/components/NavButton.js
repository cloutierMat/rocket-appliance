import React from "react";

export default function NavButton(props) {
    const { name } = props
    return (
        <button className="navButton">{ name }</button>
    )
}