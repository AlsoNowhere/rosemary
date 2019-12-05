import React from "react";
import ReactDOM from "react-dom";
import { mount } from "enzyme";
import { Table, TableColumn, TableContentRow } from "../table.component";

describe("Table component",()=>{
    it("Renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Table />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    describe("mount component without props",()=>{
        let component;

        beforeEach(()=>{
            component = mount(<Table />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should produce a div table wrapper",()=>{
            expect(component.find("*").at(0).childAt(0).name()).toBe("div");
        });

        it("should produce a table",()=>{
            expect(component.find("*").at(0).childAt(0).childAt(0).name()).toBe("table");
        });
    });

    describe("mount component with one row",()=>{
        let component;
        const columns = [new TableColumn("one","One")];
        const rows = [{one:1}];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render two rows (one in the head and one in the body)",()=>{
            expect(component.find("tr").length).toBe(2);
            expect(component.find("thead").find("tr").length).toBe(1);
            expect(component.find("tbody").find("tr").length).toBe(1);
        });

        it("should render one column for each row",()=>{
            expect(component.find("tbody").find("tr").find("td").length).toBe(1);
        });

        it("should generate a span for each cell",()=>{
            expect(component.find("tbody").find("tr").at(0).find("td").at(0).childAt(0).name()).toBe("span");
        });

        it("should generate the correct content",()=>{
            expect(component.find("tbody").find("tr").at(0).find("td").at(0).childAt(0).text()).toBe(rows[0].one.toString());
        });
    });

    describe("mount component with specific header content",()=>{
        let component;
        const columns = [new TableColumn("one","One",{headerContent:(column)=>(<button type="button">{column.label}</button>)})];
        const rows = [{one:1}];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should generate the specified content for each header",()=>{
            expect(component.find("thead").find("tr").at(0).find("th").at(0).childAt(0).name()).toBe("button");
        });

        it("should generate the correct content",()=>{
            expect(component.find("thead").find("tr").at(0).find("th").at(0).childAt(0).text()).toBe(columns[0].label);
        });
    });

    describe("mount component with specific cell content",()=>{
        let component;
        const columns = [new TableColumn("one","One",{cellContent:(row,column)=>(<button type="button">{row[column.name]}</button>)})];
        const rows = [{one:1}];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should generate the specified content for each cell",()=>{
            expect(component.find("tbody").find("tr").at(0).find("td").at(0).childAt(0).name()).toBe("button");
        });

        it("should generate the correct content",()=>{
            expect(component.find("tbody").find("tr").at(0).find("td").at(0).childAt(0).text()).toBe(rows[0].one.toString());
        });
    });

    describe("mount component with specific header styles",()=>{
        let component;
        const colour = "pink";
        const columns = [new TableColumn("one","One",{headerStyles:{color:colour}})];
        const rows = [{one:1}];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should generate the specified header styles",()=>{
            expect(component.find("thead").find("tr").at(0).find("th").prop("style").color).toBe(colour);
        });
    });

    describe("mount component with specific cell styles",()=>{
        let component;
        const colour = "pink";
        const columns = [new TableColumn("one","One",{cellStyles:{color:colour}})];
        const rows = [{one:1}];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} />);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should generate the specified cell styles",()=>{
            expect(component.find("tbody").find("tr").at(0).find("td").prop("style").color).toBe(colour);
        });
    });

    describe("when adding a row click to the table and clicking on a row",()=>{
        let component;
        let context;
        const columns = [new TableColumn("one","One")];
        const rows = [{one:1}];
        const run = {run(){}};
        const clickSpy = jest.spyOn(run,"run");

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={rows} rowClick={run.run} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should run the supplied function",(done)=>{
            context.childAt(0).childAt(0).childAt(1).childAt(0).simulate("click");
            setTimeout(()=>{
                component.update();
                expect(clickSpy).toHaveBeenCalled();
                done();
            },0);
        });
    });

    describe("when defining a specific row content",()=>{
        let component;
        let context;
        const value = "Leaving...";
        const rows = [new TableContentRow(() => (
            <tr>
                <td>{value}</td>
            </tr>
        ))];

        beforeEach(()=>{
            component = mount(<Table columns={[]} rows={rows} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the user defined row instead of an automated row",()=>{
            context.childAt(0).childAt(0).childAt(1).childAt(0)
            
            expect(context.childAt(0).childAt(0).childAt(1).childAt(0).name()).toBe("tr");
            expect(context.childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).name()).toBe("td");
            expect(context.childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).text()).toBe(value);
        });
    });

    describe("when adding a click to the cells",()=>{
        let component;
        let context;
        const run = {run(){}};
        const clickSpy = jest.spyOn(run,"run");
        const columns = [new TableColumn("","",{cellClick:()=>run.run()})];

        beforeEach(()=>{
            component = mount(<Table columns={columns} rows={[{}]} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the user defined row instead of an automated row",()=>{
            context.childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).simulate("click");
            component.update();
            expect(clickSpy).toHaveBeenCalled();
        });
    });
});
