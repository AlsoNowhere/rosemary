import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const ExampleModel = function(){const m = new modeller.ModelBuilder();m.add("E","string");return m.create();}();

describe("ModallerForm2 component - basic tests",()=>{
    describe("providing a basic form",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} formValues={new ExampleModel()} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should output a form element",()=>{
            expect(context.childAt(0).name()).toBe("form");
        });

        it("should output a single field",()=>{
            expect(context.childAt(0).childAt(0).name()).toBe("div");
            expect(context.childAt(0).childAt(0).childAt(0).name()).toBe("Field");
        });

        it("should output a container for buttons at the bottom of the form",()=>{
            expect(context.childAt(0).childAt(1).name()).toBe("div");
        });

        it("should output a single button for submit",()=>{
            expect(context.childAt(0).childAt(1).children().length).toBe(1);
            expect(context.childAt(0).childAt(1).childAt(0).name()).toBe("button");
        });

        it("should make that single output button latge",()=>{
            expect(context.childAt(0).childAt(1).childAt(0).hasClass("large")).toBe(true);
        });
    });
});
