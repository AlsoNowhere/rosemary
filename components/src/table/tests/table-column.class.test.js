import { TableColumn } from "../table.component";

describe("Table column class",()=>{
    describe("create object with no arguments",()=>{
        const obj = new TableColumn();

        it("should create an object with two empty string",()=>{
            expect(obj.name).toBe("");
            expect(obj.label).toBe("");
            expect(Object.keys(obj).length).toBe(2);
        });
    });

    describe("create object with create name and label",()=>{
        const name = "one";
        const label = "One";
        const obj = new TableColumn(name,label);

        it("should create an object with correct name",()=>{
            expect(obj.name).toBe(name);
        });

        it("should create an object with correct label",()=>{
            expect(obj.label).toBe(label);
        });
    });

    describe("passing empty object adds no new properties",()=>{
        const obj = new TableColumn("","",{});

        it("should add only name and label",()=>{
            expect(Object.keys(obj).length).toBe(2);
        });
    });

    describe("passing object with unrecognised property adds no new properties",()=>{
        const obj = new TableColumn("","",{example(){}});

        it("should add only name and label",()=>{
            expect(Object.keys(obj).length).toBe(2);
            expect(obj.example).toBe(undefined);
        });
    });

    describe("passing object with recognised property adds this function to the resulting object",()=>{
        const cellContent = ()=>{};
        const obj = new TableColumn("","",{cellContent});

        it("should add this property",()=>{
            expect(Object.keys(obj).length).toBe(3);
            expect(obj.cellContent).toBe(cellContent);
        });
    });

    describe("passing object with several recognised property adds these functions to the resulting object",()=>{
        const cellContent = ()=>{};
        const cellStyles = {};
        const obj = new TableColumn("","",{cellContent,cellStyles});

        it("should add this property",()=>{
            expect(Object.keys(obj).length).toBe(4);
            expect(obj.cellContent).toBe(cellContent);
            expect(obj.cellStyles).toBe(cellStyles);
        });
    });
});
