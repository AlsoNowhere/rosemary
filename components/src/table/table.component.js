import React from "react";
import { loggerService } from "services";

export class TableColumn {
	constructor(name = "",
		label = "",
		options){
		this.name = typeof name !== "string" ? "" : name;
		this.label = typeof label !== "string" ? "" : label;
		if (!options) {
			return;
		}
		if (options.headerContent) {
			this.headerContent = options.headerContent;
		}
		if (options.cellContent) {
			this.cellContent = options.cellContent;
		}
		if (options.headerStyles) {
			this.headerStyles = options.headerStyles;
		}
		if (options.cellStyles) {
			this.cellStyles = options.cellStyles;
		}
		// if (options.rowContent) {
		// 	this.rowContent = options.rowContent;
		// }
		if (options.cellClick) {
			this.cellClick = options.cellClick;
		}
	}
}

export const Table = props => {
	const columns = props.columns
		? props.columns.filter(x => x instanceof TableColumn)
		: [];

	const rows = props.rows || [];

	const rowStyles = props.rowStyles || {};
	const rowClasses = props.rowClasses || "";
	const cellClasses = props.cellClasses || "";

	return (
		<div className="table-responsive-wrapper">
			<table className="table">
				<thead>
					<tr>
						{columns.map((column,i)=>(
							<th style={column.headerStyles||{}} onClick={() => props.headerClick && props.headerClick(column,i)} key={i}>
								{
									column.headerContent
										? column.headerContent(column)
										: (<span>{column.label}</span>)
								}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row,i)=>(
                        <React.Fragment key={i}>
							{row.rowContent
								? row.rowContent()
								: (
									<tr className={rowClasses}
										style={{...rowStyles}}
										onClick={() => props.rowClick && props.rowClick(row,i)}>
										{columns.map((column,j)=>(
											<td className={cellClasses}
												style={column.cellStyles||{}}
												onClick={event => column.cellClick && column.cellClick(event,row,column,i,j)}
												key={j}>
												{
													column.cellContent
														? column.cellContent(row,column,i,j)
														: (<span>{row[column.name]}</span>)
												}
											</td>
										))}
									</tr>
								)
							}
						</React.Fragment>
					))}
				</tbody>
			</table>
		</div>
	);
};

export const TableContentRow = function(rowContent){
	if (!(rowContent instanceof Function)) {
		return loggerService.error("TableContentRow - AFS-Components - table.component.js",
			"You must pass a function to the argument 'rowContent' prop.");
	}
	this.rowContent = rowContent;
}
