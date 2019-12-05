import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const AbstractModel = function(){const m = new modeller.ModelBuilder("abstract");m.add("E","string");return m.create();}();
const ExampleModel = function(){const m = new modeller.ModelBuilder();m.add("E","string");return m.create();}();

describe("ModallerForm2 component",()=>{
    describe("render with no props",()=>{
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

        it("should throw an error about missing a name",()=>{
            expect(() => {
                component = mount(<ModellerForm2 />);
            }).toThrowError(new Error("AFS-Components - Modeller Form - name prop You must pass a name for the form."));
        });
    });

    describe("provide a name",()=>{
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
                component = mount(<ModellerForm2 name="example-form" />);
            }).toThrowError(new Error("AFS-Components - Modeller Form - model prop You must pass an instance of modeller.Modeller to use this component."));
        });
    });

    describe("provide an Abstract model as the model",()=>{
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

        it("should throw an error about not being able to pass in an Abstract model",()=>{
            expect(() => {
                component = mount(<ModellerForm2 name="example-form" model={AbstractModel} />);
            }).toThrowError(new Error(`AFS-Components - Modeller Form - model prop The Model you have provided is an Abstract model and cannot be used (${AbstractModel.name})`));
        });
    });

    describe("provide a valid model as the model",()=>{
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

        it("should throw an error about not being able to pass in an Abstract model",()=>{
            expect(() => {
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} />);
            }).toThrowError(new Error("AFS-Components - Modeller Form - formValues prop You must pass an instance of the model you have provided for the formValues prop."));
        });
    });

    describe("providing a valid object as the form values",()=>{
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
    });
});
