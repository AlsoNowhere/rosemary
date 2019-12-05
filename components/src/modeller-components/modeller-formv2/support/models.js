
import { baseField } from "./base-field";

const resolveLeadingZero = input => {
    let prefix = "";
    if (
        (typeof input === "number" && input < 10)
        || (typeof input === "string" && input.length === 1)
    ) {
        prefix = "0";
    }
    return prefix + input;
}

const threeDatePart = date => {
    const day = resolveLeadingZero(date.getDate());
    const month = resolveLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return {year,month,day};
}

const dateFormats = {
    "yyyy-mm-dd"(date){
        const threeParts = threeDatePart(date);
        return `${threeParts.year}-${threeParts.month}-${threeParts.day}`;
    }
}

export const models = {
    Date: (field,label,formValues,updateFormValues,overwrites,model,options,index) => {
        if (formValues[field] instanceof Date) {
            formValues[field] = dateFormats["yyyy-mm-dd"](formValues[field]);
        }
        return baseField(field,"date",label,formValues,updateFormValues,overwrites,model,options,index);
    }
};
