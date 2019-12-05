import React from "react";
import { mount } from "enzyme";
import { Field } from "../field.component";

describe("Field component - setting the field type",()=>{
    describe("with type as number",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="number" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("number");
        });
    });

    describe("with type as date",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="date" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("date");
        });
    });

    describe("with type as time",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="time" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("time");
        });
    });

    describe("with type as radio",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="radio" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("radio");
            expect(context.childAt(0).prop("className")).toBe("radio  ");
        });
    });

    describe("with type as checkbox",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="checkbox" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("checkbox");
            expect(context.childAt(0).prop("className")).toBe("checkbox  ");
        });
    });

    describe("with type as textarea",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="textarea" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("textarea");
        });
    });

    describe("with type as select",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field type="select" />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("select");
        });
    });

    describe("dropdown type",()=>{
        let component;

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

        describe("with only type prop defined",()=>{
            it("should throw an error about having no set value",()=>{
                expect(() => {
                    component = mount(<Field type="dropdown" />);
                }).toThrowError(new Error("AFS-Components - Dropdown component - value prop You must pass an instance of DropdownItem or null as the value for the Dropdown component."));
            });
        });

        describe("with only type prop and value prop defined",()=>{
            it("should throw an error about having no set value",()=>{
                expect(() => {
                    component = mount(<Field type="dropdown" value={null} />);
                }).not.toThrow();
            });
        });
    });
});
