import React from "react";
import { path } from "services";

const onClick = (event,to) => {
    event.preventDefault();
    path.path = to.split("/");
}

export const NavLink = props => {

    const to = typeof props.to === "string" ? props.to : "";
    const label = props.label;
    const className = typeof props.className === "string" ? props.className : "";

    return (
        <a href={to} className={className} onClick={event => onClick(event,to)}>{label instanceof Function ? label() : label}</a>
    );
}
