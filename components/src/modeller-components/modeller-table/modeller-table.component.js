import React from "react";

import { modeller, loggerService } from "services";

import { Table, TableColumn, TableContentRow } from "../../table/table.component";

export const ModellerTable = props => {

    const model = props.model;

    const errorLocation = "AFS-Components - Modeller Table - model prop";

    if (!(model instanceof Function) || !((new model()) instanceof modeller.Modeller)) {
        const error = "You must pass an instance of modeller.Modeller to use this component.";
        loggerService.error(errorLocation, error);
        throw new Error(errorLocation + " " + error);
    }

    if (!(props.extendColumns instanceof Array) && props.extendColumns !== undefined) {
        const error = "You must pass an Array or 'undefined' to the extendColumns prop.";
        loggerService.error(errorLocation, error);
        throw new Error(errorLocation + " " + error);
    }

    const extendColumns = props.extendColumns || [];

    const rowStyles = props.rowStyles || {};
    const rowClasses = props.rowClasses || "";
    const cellClasses = props.cellClasses || "";

    const columns = function(){
        const columns = [...extendColumns];
        const newContext = new (model ? model : props.model)();
        const aliases = newContext.getAliases();
        const options = newContext.getOptions();
        Object.keys(newContext).reduce((a,b)=>{
            if (options && options[b] && typeof options[b].hide === "boolean" && options[b].hide) {
                return a;
            }
            if (props.overwrites && props.overwrites[b] && props.overwrites[b].hide) {
                return a;
            }
            a.push(b);
            return a;
        },[]).reverse().forEach(x=>{
            columns.unshift(
                props.overwrites && props.overwrites[x] && props.overwrites[x].tableColumn && props.overwrites[x].tableColumn instanceof TableColumn
                ? props.overwrites[x].tableColumn
                : new TableColumn(x,aliases[x],function(){
                    if (typeof newContext[x] === "boolean") {
                        return {
                            cellContent: (row,column) => (<span className={`fa fa-${row[column.name]?"check":"times"}`}></span>)
                        };
                    }
                }())
            );
        });
        return columns;
    }();

    if (!(props.rows instanceof Array)) {
        const location = "AFS-Components - Modeller Table - rows prop";
        const error = "You must pass an Array to the 'rows' prop. (This Array must be made up of instances of the constructor function you are passing to the 'model' prop.";
        loggerService.error(location, error);
        throw new Error(location + " " + error);
    }

    const rows = props.rows.filter(x => x instanceof model || x instanceof TableContentRow);

    const outgoingProps = {columns,rows};

    if (props.rowClick) {
        outgoingProps.rowClick = props.rowClick;
    }
    if (rowStyles) {
        outgoingProps.rowStyles = rowStyles;
    }
    if (rowClasses) {
        outgoingProps.rowClasses = rowClasses;
    }
    if (cellClasses) {
        outgoingProps.cellClasses = cellClasses;
    }
    if (props.headerClick) {
        outgoingProps.headerClick = props.headerClick;
    }

    return (
        <Table {...outgoingProps} />
    )
}
