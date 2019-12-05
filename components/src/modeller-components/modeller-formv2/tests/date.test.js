import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const ExampleModel = function(){const m = new modeller.ModelBuilder();
    m.add("E","string",new modeller.Options({type:"date"}));return m.create();}();

describe("ModallerForm2 component - date fields",()=>{
    describe("a single date field",()=>{
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} formValues={new ExampleModel()} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should output a date field",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("type")).toBe("date");
        });
    });
});
