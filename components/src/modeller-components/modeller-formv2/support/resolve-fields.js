import { modeller } from "services";
import { DropdownItem } from "../../../dropdown/dropdownitem.class";

export const resolveFields = context => {
    const fields = {};
    Object.keys(context).forEach(x=>{
        if (!(context[x] instanceof modeller.Single)) {
            return fields[x] = context[x];
        }
        const innerContext = new (context[x].context)();
        if (innerContext instanceof Date || innerContext instanceof DropdownItem) {
            return fields[x] = context[x];
        }
        Object.keys(innerContext).forEach(y=>{
            fields[y] = innerContext[y];
        });
    });
    console.log("Context: ", fields, context);
    return fields;
}
