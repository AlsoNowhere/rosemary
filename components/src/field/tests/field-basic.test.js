import React from "react";
import { mount } from "enzyme";
import { Field } from "../field.component";

describe("Field component - basic tests",()=>{
    describe("mount component without props",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<Field />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render a label element",()=>{
            expect(context.childAt(0).name()).toBe("label");
        });

        it("should render a span element for the label",()=>{
            expect(context.childAt(0).childAt(0).name()).toBe("span");
        });

        it("should render an input element of type text as default",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("input");
            expect(context.childAt(0).childAt(1).prop("type")).toBe("text");
        });

        it("should not render a warning message as field should be valid",()=>{
            expect(context.childAt(0).children().length).toBe(2);
        });
    });

    describe("mount component with label",()=>{
        let component;
        let context;
        const label = "Example";

        beforeEach(()=>{
            component = mount(<Field label={label} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should render the label in the label element",()=>{
            expect(context.childAt(0).text()).toBe(label);
        });
    });

    describe("mount component with name",()=>{
        let component;
        let context;
        const name = "example";

        beforeEach(()=>{
            component = mount(<Field name={name} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the name attribute with the props value",()=>{
            expect(context.childAt(0).childAt(1).prop("name")).toBe(name);
        });
    });

    describe("mount component with className",()=>{
        let component;
        let context;
        const className = "example";

        beforeEach(()=>{
            component = mount(<Field className={className} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the className attribute with the props value",()=>{
            expect(context.childAt(0).prop("className")).toBe("  " + className);
        });
    });

    describe("mount component with placeholder",()=>{
        let component;
        let context;
        const placeholder = "example";

        beforeEach(()=>{
            component = mount(<Field placeholder={placeholder} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should add the placeholder attribute with the props value",()=>{
            expect(context.childAt(0).childAt(1).prop("placeholder")).toBe(placeholder);
        });
    });
});
