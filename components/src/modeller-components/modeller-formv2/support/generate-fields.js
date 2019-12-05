import React from "react";

import { modeller } from "services";

import { DropdownItem } from "../../../dropdown/dropdownitem.class";

import { baseField } from "./base-field";

export const generateField = (props,model,formValues,currentFormObject,overwrites,fields,validChecks) => (x,i) => {
    let type = "text";
    let options = false;
    let hide = false;
    const aliases = model.aliases;
    const propertyOptions = model.options[x];

    if (typeof fields[x] === "boolean") {
        type = "checkbox";
    }
    if (typeof fields[x] === "number") {
        type = "number";
    }

    if (!!propertyOptions) {
        if (typeof propertyOptions.type === "string") {
            type = propertyOptions.type;
        }
        if (typeof propertyOptions.hide === "boolean") {
            hide = propertyOptions.hide;
        }
    }

    if (fields[x] instanceof modeller.Single) {
        const contextOptions = fields[x].options;
        const context = new (fields[x].context)();

        if (!!contextOptions) {
            if (contextOptions.options instanceof Array) {
                if (!(contextOptions.options[0] instanceof DropdownItem) && typeof contextOptions.options[1] === "string") {
                    options = contextOptions.options[0][contextOptions.options[1]];
                }
                else {
                    options = contextOptions.options.filter(x=>x instanceof DropdownItem);
                }
            }
        }

        if (context instanceof DropdownItem) {
            type = "dropdown";
        }
        else if (context instanceof Date) {
            type = "date";
            if (!(formValues[x] instanceof Date)) {
                formValues[x] = "";
            }
        }
        else {
            formValues[x] = formValues[x] instanceof modeller.Single ? context : formValues[x];
            overwrites[x] = overwrites[x] || {};
            return Object.keys(context).map((y,j)=>generateField(props,model,formValues,formValues[x],overwrites[x],context,validChecks)(y,j));
        }
    }

    if (overwrites[x]) {
        if (typeof overwrites[x].type === "string") {
            type = overwrites[x].type;
        }
        if (overwrites[x].options instanceof Array) {
            options = overwrites[x].options.filter(x => x instanceof DropdownItem);
        }
        if (typeof overwrites[x].hide === "boolean") {
            hide = overwrites[x].hide;
        }
    }

    if (hide === true) {
        return (<span key={i}></span>);
    }

    return baseField(x,type,aliases[x],formValues,currentFormObject,props,overwrites,model,options,i,validChecks);
}
