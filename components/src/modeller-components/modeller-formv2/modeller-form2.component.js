import React, { useState, useRef } from "react";

import { modeller, loggerService, goError, validation2 } from "services";

import { Loading } from "../../loading/loading.component";

import { generateField } from "./support/generate-fields";

export const ModellerForm2 = props => {

    const form = useRef(null);

// Validate the name from props.
    if (!props.name || typeof props.name !== "string") {
        goError("AFS-Components - Modeller Form - name prop","You must pass a name for the form.")
    }
    const name = props.name;

// Validate the model from props.
    if (!(props.model instanceof Function) || !((new props.model()) instanceof modeller.Modeller)) {
        goError("AFS-Components - Modeller Form - model prop","You must pass an instance of modeller.Modeller to use this component.");
    }
    if (props.model.type === "abstract") {
        // return loggerService.error("AFS-Components - Modeller Form - model prop",`The Model you have provided is an Abstract model and cannot be used (${props.model.name})`);
        goError("AFS-Components - Modeller Form - model prop",`The Model you have provided is an Abstract model and cannot be used (${props.model.name})`);
    }
    const model = props.model;

// Validate the formValues from props.
    if (!((props._inheritence ? props._inheritence.formValues : props.formValues) instanceof model)) {
        // return loggerService.error("AFS-Components - Modeller Form - formValues prop","You must pass an instance of the model you have provided for the formValues prop.");
        goError("AFS-Components - Modeller Form - formValues prop","You must pass an instance of the model you have provided for the formValues prop.");
    }
    const formValues = props._inheritence ? props._inheritence.formValues : props.formValues;

// Validate the footerContent from props.
    if (props.footerContent !== undefined && typeof props.footerContent !== "function") {
        return loggerService.error("AFS-Components - Modeller Form - footerContent prop","You pass a function for the prop footerContent or undefined.");
    }
    const footerContent = props.footerContent;

// Validate the submitLabel from props.
    if (props.submitLabel !== undefined && typeof props.submitLabel !== "string") {
        loggerService.warn("Props submitLabel should be a string. Value passed was ignored here.");
    }
    const submitLabel = typeof props.submitLabel === "string" ? props.submitLabel : "Submit";

// Validate the cancel from props.
    if (props.cancel !== undefined && !(props.cancel instanceof Function)) {
        goError("AFS-Components - Modeller Form - cancel prop","You pass a function for the prop cancel or undefined.");
    }
    const cancel = props.cancel ? props.cancel : undefined;

// Validate the loading from props.
    if (typeof (props._inheritence ? props._inheritence.loading : props.loading) !== "boolean"
        && (props._inheritence ? props._inheritence.loading : props.loading) !== undefined) {
        goError("AFS-Components - Modeller Form - loading prop","You pass a boolean for the prop loading or undefined.");
    }
    const loading = (props._inheritence ? props._inheritence.loading : props.loading);

    const newContext = new (model ? model : props.model)();
    const [fields] = useState(newContext);
    const structure = props.structure || (fields ? Object.keys(fields).map(x => ({column:"grid_small-12",fields:[x]})) : []);
    const overwrites = props.overwrites || {};
    const [validChecks,setValidChecks] = useState(Object.keys(newContext).reduce((a,b)=>(a[b]={valid:true,message:""},a),{}));

    const onSubmit = event => {
        event.preventDefault();
        const newValidChecks = validation2(formValues,model,validChecks);
        setValidChecks(newValidChecks);
        const valid = Object.keys(newValidChecks).reduce((a,b)=>a?newValidChecks[b].valid:a,true);
        valid && props.onSubmit && props.onSubmit();
    };

    return (
        <form name={name}
            className="flex"
            autoComplete="off"
            ref={form}
            onSubmit={event => onSubmit(event)}
            >
            {props.topContent && props.topContent}

            {structure.map((y,j)=>(
                <div className={y.column} key={j}>
                    {y.fields.map(generateField(props,model,formValues,formValues,overwrites,fields,validChecks))}
                </div>
            ))}
            
            {footerContent
                ? footerContent()
                : (
                    <div className="flex">
                        <button className="large margin-right">{submitLabel}</button>
                        {!!cancel && (
                            <button type="button" className="grey large margin-right" onClick={cancel}>Cancel</button>
                        )}
                        {loading && (<span className="padding"><Loading /></span>)}
                    </div>
                )}
        </form>
    );
};
