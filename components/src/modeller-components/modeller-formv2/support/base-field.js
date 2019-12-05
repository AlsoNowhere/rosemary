import React from "react";

import { Field2 } from "../../../field/fieldv2.component";
import { DropdownItem } from "../../../dropdown/dropdownitem.class";

const isRequired = (model,field) => {
    const validators = model.validators;
    const required = validators[field] && validators[field].rules.find(x => x.type === "required");
    return required === undefined ? false : !required.not;
}

export const baseField = (name,type,alias,formValues,currentFormObject,props,overwrites,model,options,i,validChecks) => {
    const extraProps = {};
    extraProps[(type === "checkbox" || type === "radio") ? "checked" : "value"] = currentFormObject[name];
    if (options instanceof Array) {
        extraProps.options = options;
    }
    if (type === "dropdown" && !(currentFormObject[name] instanceof DropdownItem) && currentFormObject[name] !== null) {
        const valueFromOptions = extraProps.options.find(x => x.value === currentFormObject[name]);
        extraProps.value = valueFromOptions || null;
    }
    return (
        <Field2 name={name}
            type={type}
            label={alias}
            className={overwrites[name] && overwrites[name].className}
            {...extraProps}
            required={isRequired(model,name)}
            disabled={overwrites[name] && overwrites[name].disabled}
            valid={validChecks[name]}
            onChange={value => {
                currentFormObject[name] = value;
                props._inheritence && props._inheritence.formValues
                    ? props._inheritence.formValues = Object.assign(new model(), formValues)
                    : props.updateFormValues(Object.assign(new model(), formValues));
            }}
            key={i} />
    );
};
