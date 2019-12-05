import React from "react";
import { Dropdown } from "../dropdown/dropdown.component";

const WarningMessage = props => (<span className="validator-error">{props.message}</span>)

// ** Props object AND types AND defaults **
// ** KEY -> ! must have, ? could have
// .label? | string | ""
// .type? | string | ""
// .name? | string | ""
// .className? | string | ""
// .required? | boolean | false
// .disabled? | boolean | false
// .options(? if any type including select. ! if dropdown) | Array | []
// .placeholder? | string | ""
// .value? | any | undefined
// .valid? | {valid:boolean,message:string} | {valid:true,message:""}
// .onChange? | ()=>{} | undefined
// ** end **

export const Field2 = props => {

    const label = props.label || "";
    const type = props.type || "text";
    const name = props.name || "";
    const className = props.className || "";
    const required = props.required || false;
    const disabled = props.disabled || false;
    const options = props.options || [];
    const placeholder = props.placeholder || "";
    const isTextarea = type === "textarea";
    const isSelect = type === "select";
    const valid = props.valid || {valid:true,message:""};
    const updateValue = newValue => {
        props.onChange && props.onChange(newValue);
    }
    const onChange = event => updateValue(event.target.value);

    let value = props.value;

    if (type !== "radio") {
        value = function(){
            return props.value === undefined
                ? ""
                : props.value;
        }();
    }

    let checked = false;
    if (type === "radio" || type === "checkbox") {
        checked = props.checked || false;
    }

    // const Label = props => (
    //     <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
    //         {typeof label === "function"
    //             ? label()
    //             : (<span>{label}</span>)
    //         }
    //         {props.children}
    //     </label>
    // );

    const fieldProps = {
        type,
        name,
        required,
        disabled,
        placeholder
    };

    if (type === "checkbox" || type === "radio") {
        return (
            <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
                {typeof label === "function"
                    ? label()
                    : (<span>{label}</span>)
                }
                <input {...fieldProps}
                    className={type}
                    value={type === "radio" ? value : false}
                    checked={checked}
                    onChange={event => updateValue(event.target.checked)} />
                <span className="check bottom no-top">
                    <svg className="middle" viewBox="0 0 24 24">
                        <g>
                            {type === "checkbox"
                                ? (<path style={{ fill: "#444" }} d="M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z " />)
                                : (<circle cx="12" cy="12" r="8" style={{ fill: "#444" }} />)}
                        </g>
                    </svg>
                </span>
            </label>
        );
    }
    else if (isTextarea) {
        return (
            <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
                {typeof label === "function"
                    ? label()
                    : (<span>{label}</span>)
                }
                <textarea {...fieldProps}
                    value={value}
                    onChange={onChange}></textarea>
                {!valid.valid && (<WarningMessage message={valid.message} />)}
            </label>
        );
    }
    else if (isSelect) {
        return (
            <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
                {typeof label === "function"
                    ? label()
                    : (<span>{label}</span>)
                }
                <select {...fieldProps}
                    value={value}
                    onChange={onChange}>
                    {
                        options.map((x, i) => (<option value={x.value} key={i}>{x.name}</option>))
                    }
                </select>
                {!valid.valid && (<WarningMessage message={valid.message} />)}
            </label>
        );
    }
    else if (type === "dropdown") {
        return (
            <Dropdown {...fieldProps}
                label={label}
                value={value}
                onChange={value => updateValue(value)}
                options={options} />
        );
    }
    else if (type === "file") {
        return (
            <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
                {typeof label === "function"
                    ? label()
                    : (<span>{label}</span>)
                }
                <input {...fieldProps}
                    onChange={event => updateValue(event.target.files)} />
                {!valid.valid && (<WarningMessage message={valid.message} />)}
                <span className="for-file">Click to attach a file</span>
                {value && value.image.type === "image/jpeg" && (<img src={value.renderString} />)}
            </label>
        );
    }

    return (
        <label className={`${type === "checkbox" || type === "radio" ? type : ""} ${required && type !== "radio" ? "required" : ""} ${className}`}>
            {typeof label === "function"
                ? label()
                : (<span>{label}</span>)
            }
            <input {...fieldProps}
                value={value}
                onChange={event => updateValue(event.target.value)} />
            {!valid.valid && (<WarningMessage message={valid.message} />)}
        </label>
    );
}
