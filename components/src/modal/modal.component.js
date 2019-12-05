import React from "react";

export const closeModal = update => {
    update("closing");
    setTimeout(()=>{
        update("");
    },300);
}

export const Modal = props => {

    const state = props.state || "";
    const label = props.label || "";
    const full = props.full === true;
    const extraClasses = props.className || "";

    const closeOnClickOnBackground = props.closeOnClickOnBackground || false;

    const isFull = () => full ? "full" : "";
    const checkState = () => state === "open"
        ? "visible"
        : state === "closing"
            ? "visible closing"
            : "";

    return (
        <article className={`modal ${isFull()} ${checkState()} ${extraClasses}`} onClick={()=>closeOnClickOnBackground && closeModal(props.update)}>
            <div className="content" onClick={e => e.stopPropagation()}>
                <header>
                    <h2>{label}</h2>
                    <button type="button" onClick={()=>closeModal(props.update)}></button>
                </header>
                {props.children}
            </div>
        </article>
    )
}
