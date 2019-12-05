import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";
import { DropdownItem } from "../../../dropdown/dropdownitem.class";

const options = {options:[]};

const ExampleModel = function(){const m = new modeller.ModelBuilder();
    m.add("E",new modeller.Single(DropdownItem,new modeller.Options({options:[options,"options"]})));return m.create();}();

describe("ModallerForm2 component - dropdown",()=>{
    describe("a single dropdown field",()=>{
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

        it("should output a dropdown field",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("type")).toBe("dropdown");
        });

        it("should give the field a default value",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("value")).toBe(null);
        });
    });

    describe("adding a pre value to the form",()=>{
        let component;
        let context;
        const exampleValue = new DropdownItem("One",1);

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} formValues={new ExampleModel(exampleValue)} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should give the field the assigned value",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("value")).toBe(exampleValue);
        });
    });
});
