import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerTable } from "./modeller-table.component";
import { TableContentRow } from "../../table/table.component";

const ValidModel = function(){
    const model = new modeller.ModelBuilder();
    model.add("One","string");
    return model.create();
}();

describe("ModallerTable component",()=>{
    describe("basic render",()=>{
        beforeEach(()=>{
            jest.spyOn(console, "error");
            console.error.mockImplementation(() => {});
            jest.spyOn(console, "log");
            console.log.mockImplementation(() => {});
        });

        afterEach(()=>{
            console.error.mockRestore();
            console.log.mockRestore();
        });

        it("should throw an error about missing a model",()=>{
            expect(() => {
                component = mount(<ModellerTable />);
            }).toThrowError(new Error("AFS-Components - Modeller Table - model prop You must pass an instance of modeller.Modeller to use this component."));
        });
    });

    describe("when passing a model",()=>{
        describe("when the model is just a random function",()=>{
            beforeEach(()=>{
                jest.spyOn(console, "error");
                console.error.mockImplementation(() => {});
                jest.spyOn(console, "log");
                console.log.mockImplementation(() => {});
            });
    
            afterEach(()=>{
                console.error.mockRestore();
                console.log.mockRestore();
            });
    
            it("should throw an error about the model not being valid",()=>{
                expect(() => {
                    component = mount(<ModellerTable model={function(){}} />);
                }).toThrowError(new Error("AFS-Components - Modeller Table - model prop You must pass an instance of modeller.Modeller to use this component."));
            });
        });

        describe("when the model is a modeller Model",()=>{
            beforeEach(()=>{
                jest.spyOn(console, "error");
                console.error.mockImplementation(() => {});
                jest.spyOn(console, "log");
                console.log.mockImplementation(() => {});
            });
    
            afterEach(()=>{
                console.error.mockRestore();
                console.log.mockRestore();
            });
    
            it("should throw an error about the lack of rows",()=>{
                expect(() => {
                    component = mount(<ModellerTable model={ValidModel} />);
                }).toThrowError(new Error("AFS-Components - Modeller Table - rows prop You must pass an Array to the 'rows' prop. (This Array must be made up of instances of the constructor function you are passing to the 'model' prop."));
            });
        });
    });

    describe("when passing a valid model and rows",()=>{
        describe("when passing an empty Array as the rows",()=>{
            let component;
            let context;
            const exampleValidModel = new ValidModel();

            beforeEach(()=>{
                component = mount(<ModellerTable model={ValidModel} rows={[]} />);
                context = component.find("*").at(0);
            });
    
            it("should add a table",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).name()).toBe("table");
            });

            it("should add one column",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(1);
            });

            it("should give the sole column the correct column name",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).text()).toBe(Object.keys(exampleValidModel)[0]);
            });

            it("should add no rows",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).children().length).toBe(0);
            });
        });

        describe("when passing an Array with items that are not instances of the model",()=>{
            let component;
            let context;
            const exampleValidModel = new ValidModel();
            const rows = ["Test",{One:"one"}];

            beforeEach(()=>{
                component = mount(<ModellerTable model={ValidModel} rows={rows} />);
                context = component.find("*").at(0);
            });
    
            it("should add a table",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).name()).toBe("table");
            });

            it("should add one column",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(1);
            });

            it("should give the sole column the correct column name",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).text()).toBe(Object.keys(exampleValidModel)[0]);
            });

            it("should add no rows",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).children().length).toBe(0);
            });
        });

        describe("when passing an Array with an item that is an instance of the model",()=>{
            let component;
            let context;
            const rows = [new ValidModel("test - One")];

            beforeEach(()=>{
                component = mount(<ModellerTable model={ValidModel} rows={rows} />);
                context = component.find("*").at(0);
            });
    
            it("should add a table",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).name()).toBe("table");
            });

            it("should add one column",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(1);
            });

            it("should give the sole column the correct column name",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).text()).toBe(Object.keys(rows[0])[0]);
            });

            it("should add one row",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).children().length).toBe(1);
            });

            it("should add the cell content inside a span as the default",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).name()).toBe("span");
            });

            it("should add the correct content to the row cell",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).text()).toBe(rows[0].One);
            });
        });
    });

    describe("when a model where the sole property is a boolean",()=>{
        const ExampleModel = function(){
            const model = new modeller.ModelBuilder();
            model.add("One bool","boolean");
            return model.create();
        }();

        describe("when passing a row that has the default value",()=>{
            let component;
            let context;
            const rows = [new ExampleModel()];
    
            beforeEach(()=>{
                component = mount(<ModellerTable model={ExampleModel} rows={rows} />);
                context = component.find("*").at(0);
            });
    
            it("should add an icon as the cell content",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).hasClass("fa")).toBe(true);
            });

            it("should add a false icon as the cell content",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).hasClass("fa-times")).toBe(true);
            });
        });

        describe("when passing a row that has the value as true",()=>{
            let component;
            let context;
            const rows = [new ExampleModel(true)];
    
            beforeEach(()=>{
                component = mount(<ModellerTable model={ExampleModel} rows={rows} />);
                context = component.find("*").at(0);
            });
    
            it("should add an icon as the cell content",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).hasClass("fa")).toBe(true);
            });

            it("should add a true icon as the cell content",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).hasClass("fa-check")).toBe(true);
            });
        });
    });

    describe("when passing a row that is an instance of TableContentRow",()=>{
        let component;
        let context;
        const exampleContent = " - test - ";
        const rows = [new TableContentRow(()=>(
            <tr>
                <td>
                    <span>{exampleContent}</span>
                </td>
            </tr>
        ))];

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} />);
            context = component.find("*").at(0);
        });

        it("should add the content as the row",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).name()).toBe("tr");
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).name()).toBe("td");
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).name()).toBe("span");
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).childAt(0).text()).toBe(exampleContent);
        });
    });

    describe("when adding a row click",()=>{
        let component;
        let context;
        const rows = [new ValidModel()];
        const run = {run(){}};
        jest.spyOn(run,"run");

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} rowClick={run.run} />);
            context = component.find("*").at(0);
        });

        it("should add the click event to the table rows",()=>{
            context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).simulate("click");
            component.update();
            expect(run.run).toHaveBeenCalled();
        });
    });

    describe("when adding row styles",()=>{
        let component;
        let context;
        const rows = [new ValidModel()];
        const styles = {color:"red"};

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} rowStyles={styles} />);
            context = component.find("*").at(0);
        });

        it("should add the styles to the rows",()=>{
            const _styles = context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).prop("style");
            expect(_styles.hasOwnProperty("color")).toBe(true);
            expect(_styles.color).toBe(styles.color);
        });
    });

    describe("when adding row classes",()=>{
        let component;
        let context;
        const rows = [new ValidModel()];

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} rowClasses="a b" />);
            context = component.find("*").at(0);
        });

        it("should add the classes to the row",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).hasClass("a")).toBe(true);
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).hasClass("b")).toBe(true);
        });
    });

    describe("when adding cell classes",()=>{
        let component;
        let context;
        const rows = [new ValidModel()];

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} cellClasses="a b" />);
            context = component.find("*").at(0);
        });

        it("should add the classes to each cell",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).hasClass("a")).toBe(true);
            expect(context.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0).childAt(0).hasClass("b")).toBe(true);
        });
    });

    describe("when adding a click to the header",()=>{
        let component;
        let context;
        const rows = [new ValidModel()];
        const run = {run(){}};
        jest.spyOn(run,"run");

        beforeEach(()=>{
            component = mount(<ModellerTable model={ValidModel} rows={rows} headerClick={run.run} />);
            context = component.find("*").at(0);
        });

        it("should add the click event to the header cells",()=>{
            context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).simulate("click");
            component.update();
            expect(run.run).toHaveBeenCalled();
        });
    });
});
