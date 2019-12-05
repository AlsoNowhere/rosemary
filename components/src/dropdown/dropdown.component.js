import React, { useState, useRef } from "react";

import { loggerService } from "services";

import { DropdownItem } from "./dropdownitem.class";

export const Dropdown = props => {
    const button = useRef(null);
    const [active,updateActive] = useState(false);
    const [query,updateQuery] = useState("");
    const [hasFocus,updateHasFocus] = useState(false);

    if (!(props.value === null || props.value instanceof DropdownItem)) {
        const location = "AFS-Components - Dropdown component - value prop";
        const error = "You must pass an instance of DropdownItem or null as the value for the Dropdown component.";
        loggerService.error(location,error);
        throw new Error(location + " " + error);
    }

    const value = props.value;
    const placeholder = props.placeholder || "";
    const label = props.label || "";

    if (!(props.options instanceof Array)) {
        loggerService.error("AFS-Components - Dropdown component - options prop","You must pass an Array of DropdownItem objects to the options prop.");
        throw new Error("AFS-Components - Dropdown component - options prop. You must pass an Array of DropdownItem objects to the options prop.");
    }

    const nonOptions = props.options.filter(x => !(x instanceof DropdownItem));

    if (nonOptions.length > 0) {
        loggerService.warn("AFS-Components - Dropdown component - options prop",`There were ${nonOptions.length} options filtered from the list passed to the options Array.`);
    }

    const options = props.options
        .filter(x => x instanceof DropdownItem)
        .filter(x => x.name.toLowerCase().includes(query.toLowerCase()));
    if (props.hasReset !== false) {
        options.unshift({
            name: " - none - ",
            value: "",
            colour: "transparent",
            initials: ""
        });
    }

    const selectedIndex = props.value === null
        ? null
        : options.reduce((a,b,i) => {
            return a !== null ? a : (props.value.value === b.value && props.value.name === b.name) ? i : a;
        },null);

    const name = props.name;
    const required = props.required || false;
    const disabled = props.disabled || false;

    const toggleActive = () => {
        updateActive(!active);
    }

    const selectOption = (option,active = false) => {
        props && props.onChange && props.onChange(option.name === " - none - " ? null : option);
        updateActive(active);
        if (active === false) {
            button.current.focus();
        }
    }

    const dropdownConductSearch = function(){
        let timeout;
        return (value) => {
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                updateQuery(value);
            },300);
        }
    }();

    const keyPressed = event => {
        if (!hasFocus || !active) {
            return;
        }
        const key = event.which;
        if (key !== 38 && key !== 40 && key !== 13) {
            return;
        }
        if (key === 13 && event.target.nodeName === "INPUT") {
            // toggleActive();
            // button.current.focus();
        }
        else if (key === 38) {
            if (selectedIndex === null) {
                selectOption(options[options.length-1],true);
            }
            else if (selectedIndex > (props.hasReset !== false ? 1 : 0)) {
                selectOption(options[selectedIndex - 1],true);
            }
        }
        else if (key === 40) {
            if (selectedIndex === null) {
                selectOption(options[props.hasReset !== false ? 1 : 0],true);
            }
            else if (selectedIndex < options.length - 1) {
                selectOption(options[selectedIndex + 1],true);
            }
        }
    }

    return (
        <div className={`dropdown-component ${required?"required":""}`}>
            <span>{label}</span>
            <button type="button"
                ref={button}
                disabled={disabled}
                onClick={() => toggleActive()}
                onFocus={() => updateHasFocus(true)}
                onBlur={() => updateHasFocus(false)}
                onKeyUp={event => keyPressed(event)} >
                <span className={value ? "" : "text-grey"}>{value === null ? placeholder : (value.name || placeholder)}</span>
                <span className="caret fa fa-caret-down"></span>
            </button>
            <input name={name}
                tabIndex="-1"
                value={value === null ? "" : value.value}
                required={required}
                onChange={()=>{}} />
            <ul className={`${active?"active":""} ${props.noLabel?"no-label":"label"}`}>
                {props.hasSearch !== false && (
                    <li className="search">
                        <label>
                            <input className="search"
                                tabIndex={active ? undefined : -1}
                                placeholder="search..."
                                onChange={event => dropdownConductSearch(event.target.value)}
                                onFocus={() => updateHasFocus(true)}
                                onBlur={() => updateHasFocus(false)}
                                onKeyUp={event => keyPressed(event)} />
                        </label>
                    </li>
                )}
                {options.map((x,i) => (
                    // console.log("Pop: ", x),
                    <li className={selectedIndex === i ? "active" : ""} onClick={() => selectOption(x)} key={i}>
                        <span className={selectedIndex === i ? "text-white" : ""}>{x.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const multiSelectConductSearch = function(){
    let timeout;
    return (query,allOptions,updateOptions) => {
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            const newOptions = allOptions.filter(x=>x.name.toLowerCase().includes(query.toLowerCase()));
            updateOptions(newOptions);
        },300);
    }
}();

export const MultiSelect = props => {

    const input = useRef(null);

    const [active,updateActive] = useState(false);
    const values = props.values;
    const label = props.label || "";

    if (!(props.options instanceof Array)) {
        loggerService.error("AFS-Components - Dropdown component - options prop","You must pass an Array of DropdownItem objects to the options prop.");
        throw new Error("AFS-Components - Dropdown component - options prop. You must pass an Array of DropdownItem objects to the options prop.");
    }

    const [options,updateOptions] = useState(function(){
        return props.options.filter(x=>x instanceof DropdownItem).map(x=>x) || [];
    }());

    const name = props.name;
    const disabled = props.disabled || false;

    const toggleActive = () => {
        updateActive(!active);
    }

    const selectOption = option => {
        const index = values.reduce((a,b,i)=>option.name===b.name?i:a,null);
        index === null
            ? values.push({name:option.name,value:option.value})
            : values.splice(index,1);
        input.current.value = JSON.stringify(values);
        props.updateParent(values);
        updateActive(false);
    }

    return (
        <div className="multi-select-component">
            <span>{label}</span>
            <div className={`${disabled?"disabled":""}`} onClick={toggleActive}>
                {values instanceof Array && values.map((x,i)=>(
                    <div className="select-item" key={i}>
                        <span>{x.name}</span>
                        <button type="button" onClick={e=>{e.stopPropagation();props.updateParent((values.splice(i,1),values.map(x=>x)))}}>
                            <span className="fa fa-times"></span>
                        </button>
                    </div>
                ))}
                <span className="caret fa fa-caret-down"></span>
            </div>
            <input name={name} tabIndex="-1" ref={input} />
            <ul className={`${active?"active":""}`}>
                <li className="search">
                    <label>
                        <input className="search" tabIndex="-1" placeholder="search..." onChange={e=>multiSelectConductSearch(e.target.value,props.options,updateOptions)} />
                    </label>
                </li>
                {options.map((x,i) => (
                    <li onClick={()=>selectOption(x)} key={i}>
                        <span>{x.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
