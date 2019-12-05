import React from "react";
import { DropdownItem } from "../dropdown/dropdownitem.class";
import { Dropdown } from "../dropdown/dropdown.component";

const sizeEitherSide = 2;

const generatePages = (total,resultsPerPage,currentPage) => {
    const list = [1];
    if (total === 0) {
        return list;
    }
    const end = Math.ceil(total / resultsPerPage);
    for (let i = currentPage - sizeEitherSide ; i <= currentPage + sizeEitherSide ; i++) {
        if (i > 0 && i < end) {
            i !== 1 && list.push(i);
        }
    }
    if (list.find(x => x === end) === undefined) {
        list.push(end);
    }
    if (list.length > 1 && list[1] !== 2) {
        list.splice(1,0,"...");
    }
    if (list.length > 1 && list[list.length-2] !== (list[list.length-1] - 1)) {
        list.splice(list.length-1,0,"...");
    }

    return list;
}

const resultsPerPageOptions = [5,10,20,50];
const resultsPerPageOptionsForDropdown = resultsPerPageOptions.map(x => new DropdownItem(x.toString(),x.toString()));

export const Paginationv2 = props => {

    if (props.total !== undefined && typeof props.total !== "number") {
        throw new Error("For total, you must either pass a number or leave the prop undefined.");
    }
    const total = parseInt(props.total) || 0;

    if (props._inheritence === undefined) {
        throw new Error("You must pass an _inheritence prop with an inheritor object from services");
    }

    if (props._inheritence.currentPage === undefined) {
        throw new Error("You must pass the current page and current page updater on the _inheritence");
    }

    if (props._inheritence.resultsPerPage === undefined) {
        throw new Error("You must pass the results per page and results per page updater on the _inheritence");
    }

    const currentPage = props._inheritence.currentPage;

    if (currentPage < 1) {
        throw new Error("The current page cannot be less than 1");
    }

    const _resultsPerPage = props._inheritence.resultsPerPage;
    const resultsPerPage = new DropdownItem(_resultsPerPage,_resultsPerPage);

    const changePage = page => {
        props._inheritence.currentPage = page;
    }

    const list = generatePages(total,resultsPerPage.value,currentPage);

    const changeResultsPerPage = resultsPer => {
        props._inheritence.resultsPerPage = resultsPer.value;
        if (currentPage > Math.ceil(total / resultsPer.value)) {
            props._inheritence.currentPage = 1;
        }
    }

    return (
        <div className="flex">
            <ul className="reset-list flex">
                {list.map((x,i) => (
                    <li className={`line-height-large margin-right ${x === currentPage ? "active" : ""}`}
                        onClick={()=>changePage(x)}
                        key={i}>
                            {x === "..."
                                ? (
                                    <span>{x}</span>
                                ) : (
                                    <button type="button"
                                        className={"large padded " + (x === currentPage ? "grey" : "")}
                                        style={{minWidth:"44px"}}
                                        onClick={() => changePage(x)}>{x}</button>
                                )}
                        </li>
                ))}
            </ul>
            <div style={{width:"120px"}}>
                <Dropdown options={resultsPerPageOptionsForDropdown}
                    value={resultsPerPage}
                    hasReset={false}
                    hasSearch={false}
                    noLabel={true}
                    onChange={value => changeResultsPerPage(value)} />
            </div>
        </div>
    )
}
