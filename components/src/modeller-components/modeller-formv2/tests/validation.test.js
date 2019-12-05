import React from "react";
import { mount } from "enzyme";
import { modeller } from "services";
import { ModellerForm2 } from "../modeller-form2.component";

const validationMessage = "testy mytestface";

describe("ModallerForm2 component - date fields",()=>{
    describe("an unpopulated required field",()=>{
        const ExampleModel = function(){
            const m = new modeller.ModelBuilder();
            m.add("E","string");
            m.validator("E","required");
            return m.create();
        }();
        const run={submit: ()=>{}};
        const spy = jest.spyOn(run,"submit");
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel()} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should make the field required",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("required")).toBe(true);
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(1).prop("required")).toBe(true);
        });

        it("should not submit the form",()=>{
            context.childAt(0).simulate("submit");
            component.update();
            expect(spy).not.toHaveBeenCalled();
        });
    });

    describe("a populated required field",()=>{
        const ExampleModel = function(){
            const m = new modeller.ModelBuilder();
            m.add("E","string");
            m.validator("E","required");
            return m.create();
        }();
        const run={submit: ()=>{}};
        const spy = jest.spyOn(run,"submit");
        let component;
        let context;

        beforeEach(()=>{
            component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel("a value")} />);
            context = component.find("*").at(0);
        });

        afterEach(()=>{
            component.unmount();
        });

        it("should make the field required",()=>{
            expect(context.childAt(0).childAt(0).childAt(0).prop("required")).toBe(true);
            expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(1).prop("required")).toBe(true);
        });

        it("should submit the form",()=>{
            context.childAt(0).simulate("submit");
            component.update();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe("a minlength",()=>{
        describe("when less than the min length",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","string");
                m.validator("E","minlength",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel()} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(3);
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).name()).toBe("WarningMessage");
            });

            it("should add the error message under the targetted field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).childAt(0).text()).toBe(validationMessage);
            });

            it("should not submit the form",()=>{
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe("when more than the min length",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","string");
                m.validator("E","minlength",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel("example")} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should not add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(2);
            });

            it("should not submit the form",()=>{
                expect(spy).toHaveBeenCalled();
            });
        });
    });

    describe("a maxlength",()=>{
        describe("when more than the max length",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","string");
                m.validator("E","maxlength",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel("example")} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(3);
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).name()).toBe("WarningMessage");
            });

            it("should add the error message under the targetted field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).childAt(0).text()).toBe(validationMessage);
            });

            it("should not submit the form",()=>{
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe("when less than the max length",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","string");
                m.validator("E","maxlength",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel()} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should not add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(2);
            });

            it("should not submit the form",()=>{
                expect(spy).toHaveBeenCalled();
            });
        });
    });

    describe("a max value",()=>{
        describe("when more than the max value",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","number");
                m.validator("E","max",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel(7)} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(3);
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).name()).toBe("WarningMessage");
            });

            it("should add the error message under the targetted field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).childAt(0).text()).toBe(validationMessage);
            });

            it("should not submit the form",()=>{
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe("when less than the max value",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","number");
                m.validator("E","max",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel()} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should not add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(2);
            });

            it("should not submit the form",()=>{
                expect(spy).toHaveBeenCalled();
            });
        });
    });

    describe("a min",()=>{
        describe("when more than the min value",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","number");
                m.validator("E","min",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel()} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(3);
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).name()).toBe("WarningMessage");
            });

            it("should add the error message under the targetted field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).childAt(2).childAt(0).text()).toBe(validationMessage);
            });

            it("should not submit the form",()=>{
                expect(spy).not.toHaveBeenCalled();
            });
        });

        describe("when more than the min value",()=>{
            const ExampleModel = function(){
                const m = new modeller.ModelBuilder();
                m.add("E","number");
                m.validator("E","min",3,validationMessage);
                return m.create();
            }();
            const run={submit: ()=>{}};
            const spy = jest.spyOn(run,"submit");
            let component;
            let context;

            beforeEach(()=>{
                component = mount(<ModellerForm2 name="example-form" model={ExampleModel} onSubmit={() => run.submit()} formValues={new ExampleModel(7)} />);
                context = component.find("*").at(0);
                context.childAt(0).simulate("submit");
                component.update();
                context = component.find("*").at(0);
            });

            afterEach(()=>{
                component.unmount();
            });

            it("should not add a WarningMessage component to the field",()=>{
                expect(context.childAt(0).childAt(0).childAt(0).childAt(0).children().length).toBe(2);
            });

            it("should not submit the form",()=>{
                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
