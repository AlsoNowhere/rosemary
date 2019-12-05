import { modeller } from "../modeller/modeller.service";
import { goError } from "../logger/goError.service";

const rules = {
    "required":(value,rule) => value === "" || value === null || value === undefined
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""}),
    "minlength":(value,rule) => value.length < rule.length
            ? ({valid:false,message:rule.message})
            : ({valid:true,message:""}),
    "maxlength":(value,rule) => value.length > rule.length
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""}),
    "min":(value,rule) => value < rule.length
            ? ({valid:false,message:rule.message})
            : ({valid:true,message:""}),
    "max":(value,rule) => value > rule.length
        ? ({valid:false,message:rule.message})
        : ({valid:true,message:""})
}

export const validation2 = (values,model,validChecks) => {
    if (!(values instanceof modeller.Modeller)) {
        goError("AFS-Services - validation - values","You must pass an instance created using modeller as the values");
    }
    if (!(model.prototype instanceof modeller.Modeller)) {
        goError("AFS-Services - validation - model","You must pass a model created using modeller as the model");
    }

    const context = new model();
    const validators = context.getValidators();

    Object.keys(validators).forEach(key=>{
        validChecks[key].valid = true;
        validChecks[key].message = "";
        validators[key].rules.forEach(rule=>{
            if (!validChecks[key].valid) {
                return;
            }
            const result = rules[rule.type] && rules[rule.type](values[key],rule);
            validChecks[key].valid = result.valid;
            validChecks[key].message = result.message;
        });
    });

    return Object.assign({},validChecks);
};
