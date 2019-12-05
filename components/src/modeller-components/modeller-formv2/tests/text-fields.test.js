import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const ExampleModel = function(){const m = new modeller.ModelBuilder();m.add("E","string");return m.create();}();

describe("ModallerForm2 component - text fields",()=>{
    describe("a single text field",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} formValues={new ExampleModel()} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should output a single field",()=>{
            expect(context.childAt(0).childAt(0).name()).toBe("div");
            expect(context.childAt(0).childAt(0).childAt(0).name()).toBe("Field");
        });

        it("should output a text field",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("type")).toBe("text");
        });

        it("should give the field no value",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("value")).toBe("");
        });
    });

    describe("adding a pre value to the form",()=>{
        let component;
        let context;
        const exampleValue = "i was wrong, it was earth all along";

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} formValues={new ExampleModel(exampleValue)} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should give the field assigned value",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("value")).toBe(exampleValue);
        });
    });
});
